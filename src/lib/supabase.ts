import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// A simple in-memory / localStorage mock layer to ensure zero configuration required for beautiful execution
class MockSupabaseClient {
  private getStore(key: string): any[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(`mock_db_${key}`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private setStore(key: string, data: any[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`mock_db_${key}`, JSON.stringify(data));
    } catch {}
  }

  constructor() {
    // Seed initial mock data if stores are empty
    if (typeof window !== 'undefined') {
      this.initMockData();
    }
  }

  private initMockData() {
    if (this.getStore('projects').length === 0) {
      this.setStore('projects', [
        {
          id: 'p1',
          title: 'NEXUS Analytics Pro v11.0 – Enterprise BI Platform',
          slug: 'nexus-analytics-pro',
          tagline: 'Autonomous zero-code predictive analytics for enterprise business intelligence.',
          description: 'A powerful AI-powered SaaS Business Intelligence platform designed to digest heavy file uploads (up to 1GB) and execute machine learning analytics pipelines.',
          category: 'AI / Backend',
          status: 'Completed',
          featured: true,
          mockup_type: 'macbook',
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          hover_video_url: '',
          github_url: 'https://github.com/Temsah1/NEXUS-Analytics-Pro',
          demo_url: 'https://nexus.kareemtamer.com',
          tags: ['Python', 'Streamlit', 'Plotly', 'SQLite', 'Scikit-Learn', 'Zustand'],
          problem: 'Relational data processing bottlenecks under high-volume business metrics analysis, requiring custom scripting and complex workflows.',
          solution: 'Engineered an ensemble VotingRegressor (Gradient Boosting + Random Forest + XGBoost + Ridge) achieving an R² of 0.91, paired with Explainable AI plots for clear decision making.',
          architecture: 'Python analytics worker -> Streamlit dashboard logic -> Plotly charting engines -> SQLite persistent admin panel.',
          results: 'Achieved an R² of 0.91 on custom industrial test suites; handles large datasets with no noticeable slowdown.',
          screenshots: []
        },
        {
          id: 'p2',
          title: 'Nexus E-Commerce Storefront',
          slug: 'nexus-ecommerce',
          tagline: 'High-throughput modern storefront with multi-module admin analytics.',
          description: 'An advanced next-gen storefront built using Next.js 16 and React 19, delivering highly performant client-side state transitions.',
          category: 'Full-Stack',
          status: 'Completed',
          featured: true,
          mockup_type: 'browser',
          image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
          hover_video_url: '',
          github_url: 'https://github.com/Temsah1/Nexus-Ecommerce',
          demo_url: 'https://shop.kareemtamer.com',
          tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Recharts'],
          problem: 'E-commerce sites often suffer from slow page load speeds, high form error rates, and laggy rendering on mobile screens.',
          solution: 'Implemented Zustand state management and React Hook Form with Zod schema validation, paired with dynamic ISR rendering to achieve a Lighthouse score of 94.',
          architecture: 'Next.js App Router -> React Server Components -> Zustand client-side store -> Recharts analytical dashboard.',
          results: 'Reduced form validation error rates by 60%; achieved an average page load time under 1.2s.',
          screenshots: []
        },
        {
          id: 'p3',
          title: 'IntelliOps AI – Industrial Predictive Maintenance',
          slug: 'intelliops-ai',
          tagline: 'Deep learning anomaly diagnostics for high-value industrial operations.',
          description: 'A production-grade industrial monitoring suite that simulates active telemetry and models failure metrics across heavy machines.',
          category: 'AI / Backend',
          status: 'Completed',
          featured: true,
          mockup_type: 'dashboard',
          image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
          hover_video_url: '',
          github_url: 'https://github.com/Temsah1/IntelliOps-AI',
          demo_url: 'https://intelliops.kareemtamer.com',
          tags: ['Python', 'Scikit-Learn', 'Plotly', 'Streamlit', 'Gradient Boosting'],
          problem: 'Unplanned downtime in energy sectors and smart factories costs organizations millions in operational overhead.',
          solution: 'Engineered a 3-model predictive machine learning pipeline (Isolation Forest + Gradient Boosting + Random Forest) achieving an AUC score of 0.95.',
          architecture: 'Streamlit simulation pipeline -> Isolation Forest anomalies model -> Gradient Boosting classification -> Plotly analytics UI.',
          results: 'Estimated to reduce unplanned downtime costs by up to 40% in oil & gas, energy, and smart manufacturing fields.',
          screenshots: []
        },
        {
          id: 'p4',
          title: 'Logistics & Order Tracking Portal',
          slug: 'logistics-order-tracking',
          tagline: 'Robust shipment scheduling and real-time transit telemetry.',
          description: 'A transaction-heavy logistics system supporting multi-tier admin configurations and weight-based cost algorithms.',
          category: 'Full-Stack',
          status: 'Completed',
          featured: false,
          mockup_type: 'mobile',
          image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          hover_video_url: '',
          github_url: 'https://github.com/Temsah1/Logistics-System',
          demo_url: 'https://logistics.kareemtamer.com',
          tags: ['Next.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST APIs'],
          problem: 'Managing high-volume transit updates across multi-stage systems manually results in lost tracking efficiency.',
          solution: 'Engineered a JWT-authorized dashboard with automatic tracking number generators and multi-level role settings.',
          architecture: 'Next.js Frontend -> Express.js API Gateway -> MongoDB database layer -> JWT RBAC system.',
          results: 'Cut shipment lookup times by 45% for dispatcher administrators.',
          screenshots: []
        }
      ]);
    }

    if (this.getStore('services').length === 0) {
      this.setStore('services', [
        {
          id: 's1',
          title: 'AI Solutions & Predictive Modeling',
          description: 'Deploy production-grade machine learning pipelines, custom analytics dashboards, and regression models designed to extract insights.',
          price: '$500+',
          delivery_time: '7-14 Days',
          features: ['Predictive ML Models (AUC 0.95)', 'Explainable AI plots & diagnostics', 'Custom Streamlit/Plotly portals', 'High-volume data pipelines'],
          image_url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=400&q=80'
        },
        {
          id: 's2',
          title: 'High-Performance Web Applications',
          description: 'Architect client-centric, SEO-optimized web products using Next.js 16, React 19, and Tailwind CSS.',
          price: '$700+',
          delivery_time: '10-20 Days',
          features: ['Next.js 16 App Router', 'React 19 Server Components', 'Zustand global state architecture', 'Lighthouse score optimizations (94+)'],
          image_url: 'https://images.unsplash.com/photo-1547658719-da2b81169b7a?auto=format&fit=crop&w=400&q=80'
        },
        {
          id: 's3',
          title: 'Backend API Development',
          description: 'Design and build high-throughput, secured REST APIs featuring sub-200ms response latencies and JWT security.',
          price: '$450+',
          delivery_time: '5-10 Days',
          features: ['Node.js & Express.js microservices', 'Python FastAPI pipelines', 'JWT authentication & RBAC', 'MongoDB & SQL database layers'],
          image_url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=400&q=80'
        }
      ]);
    }

    if (this.getStore('skills').length === 0) {
      this.setStore('skills', [
        { id: 'k1', name: 'Python', category: 'Backend', proficiency: 98 },
        { id: 'k2', name: 'JavaScript & TypeScript', category: 'Frontend', proficiency: 95 },
        { id: 'k3', name: 'Next.js & React.js', category: 'Frontend', proficiency: 94 },
        { id: 'k4', name: 'Express.js', category: 'Backend', proficiency: 92 },
        { id: 'k5', name: 'Streamlit & Plotly', category: 'AI', proficiency: 90 },
        { id: 'k6', name: 'Scikit-Learn', category: 'AI', proficiency: 88 },
        { id: 'k7', name: 'MongoDB & SQLite', category: 'Databases', proficiency: 90 },
        { id: 'k8', name: 'Zustand', category: 'Frontend', proficiency: 92 },
        { id: 'k9', name: 'Git & GitHub', category: 'Tools', proficiency: 95 },
        { id: 'k10', name: 'Vercel & AWS', category: 'Tools', proficiency: 85 }
      ]);
    }

    if (this.getStore('experience').length === 0) {
      this.setStore('experience', [
        {
          id: 'ex1',
          company: 'Decodelabs (Remote)',
          position: 'Python Developer & Data Analytics Intern',
          dates: 'May 2026 - Present',
          description: 'Engineered Python backend data pipelines integrating REST APIs and MongoDB, reducing latency by 38% for global cross-functional systems.',
          order_index: 0
        },
        {
          id: 'ex2',
          company: 'CodeAlpha (Remote)',
          position: 'Back-End Developer Intern',
          dates: 'May 2026 - Present',
          description: 'Architected Node.js/Express.js RESTful API endpoints serving 500+ concurrent requests under 200ms latency. Configured JWT security, RBAC, and automated deployment pipelines.',
          order_index: 1
        },
        {
          id: 'ex3',
          company: 'British University in Egypt (BUE)',
          position: 'AI & Machine Learning Intern',
          dates: 'Jan 2026',
          description: 'Applied machine learning classifiers on industrial datasets. Created data visualizations and engineered IntelliOps AI anomaly detection platform achieving an AUC of 0.95.',
          order_index: 2
        }
      ]);
    }

    if (this.getStore('testimonials').length === 0) {
      this.setStore('testimonials', [
        {
          id: 't1',
          client_name: 'Dr. Sarah Al-Mansoori',
          client_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
          company: 'BUE Faculty Panel',
          rating: 5,
          testimonial: 'Kareem presented an outstanding machine learning diagnostic model that exceeded our expectations. The predictive maintenance platform runs efficiently and outputs clear, actionable visualizations.'
        },
        {
          id: 't2',
          client_name: 'David Miller',
          client_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
          company: 'Decodelabs',
          rating: 5,
          testimonial: 'Kareem integrated complex backend APIs with incredible speed and accuracy. He reduced our pipeline processing delays by 38% and wrote comprehensive technical docs.'
        }
      ]);
    }

    if (this.getStore('messages').length === 0) {
      this.setStore('messages', [
        {
          id: 'm1',
          name: 'Jane Doe',
          email: 'jane@decode.com',
          subject: 'Contract Collaboration Offer',
          message: 'Hello Kareem, we are interested in scheduling a freelance consultation for our upcoming predictive dashboard. Let us know your availability.',
          is_read: false,
          is_archived: false,
          created_at: new Date().toISOString()
        }
      ]);
    }

    if (this.getStore('analytics').length === 0) {
      const now = Date.now();
      const events = [];
      for (let i = 0; i < 30; i++) {
        const time = new Date(now - 3600000 * 24 * i).toISOString();
        events.push({ id: `a_pv_${i}`, event_type: 'page_view', path: '/', created_at: time });
      }
      this.setStore('analytics', events);
    }

    if (this.getStore('seo_settings').length === 0) {
      this.setStore('seo_settings', [
        {
          id: 's_seo_1',
          page_path: '/',
          meta_title: 'Kareem Tamer | Full-Stack & Python Developer | AI Developer',
          meta_description: 'Portfolio of Kareem Tamer, offering high-throughput API design, predictive machine learning pipelines, and modern full-stack web products.',
          keywords: ['Kareem Tamer', 'Python Developer', 'Full Stack Developer', 'AI Developer', 'Software Engineer', 'Predictive Maintenance'],
          og_image_url: '/images/kareem.jpg'
        }
      ]);
    }
  }

  from(table: string) {
    const data = this.getStore(table);
    const self = this;

    return {
      select: (columns: string = '*') => {
        return {
          order: (column: string, { ascending = true } = {}) => {
            const sorted = [...data].sort((a, b) => {
              if (a[column] < b[column]) return ascending ? -1 : 1;
              if (a[column] > b[column]) return ascending ? 1 : -1;
              return 0;
            });
            return Promise.resolve({ data: sorted, error: null });
          },
          eq: (column: string, value: any) => {
            const filtered = data.filter(item => item[column] === value);
            return {
              single: () => Promise.resolve({ data: filtered[0] || null, error: filtered.length ? null : new Error('Not found') }),
              then: (cb: any) => cb({ data: filtered, error: null })
            };
          },
          then: (cb: any) => cb({ data, error: null })
        };
      },
      insert: (records: any | any[]) => {
        const list = Array.isArray(records) ? records : [records];
        const newRecords = list.map(r => ({ id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString(), ...r }));
        const current = self.getStore(table);
        self.setStore(table, [...current, ...newRecords]);
        return Promise.resolve({ data: newRecords, error: null });
      },
      update: (updates: any) => {
        return {
          eq: (column: string, value: any) => {
            const current = self.getStore(table);
            const updated = current.map(item => {
              if (item[column] === value) {
                return { ...item, ...updates };
              }
              return item;
            });
            self.setStore(table, updated);
            return Promise.resolve({ data: updated.filter(i => i[column] === value), error: null });
          }
        };
      },
      delete: () => {
        return {
          eq: (column: string, value: any) => {
            const current = self.getStore(table);
            const filtered = current.filter(item => item[column] !== value);
            self.setStore(table, filtered);
            return Promise.resolve({ data: current.filter(item => item[column] === value), error: null });
          }
        };
      }
    };
  }
}

// Instantiate either real or mock Supabase
let supabase: any;

if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-supabase')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  supabase = new MockSupabaseClient();
}

export { supabase };
