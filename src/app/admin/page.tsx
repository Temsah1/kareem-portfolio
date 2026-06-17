"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Lock,
  Mail,
  ShieldCheck,
  TrendingUp,
  FolderDot,
  FileSpreadsheet,
  Settings,
  MessageSquare,
  Trash2,
  FolderOpen,
  Calendar,
  Layers,
  Sparkles,
  Search,
  BookOpen
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"analytics" | "messages" | "projects" | "services" | "skills" | "experience">("analytics");

  // Auth check
  useEffect(() => {
    // Basic local session flag to ease offline demonstration immediately
    if (typeof window !== "undefined") {
      const storedSession = localStorage.getItem("admin_session");
      if (storedSession) {
        setSession({ email: 'kareemeltemsah7@gmail.com' });
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (email === "kareemeltemsah7@gmail.com" && password === "temsah1") {
      setSession({ email });
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_session", "true");
      }
    } else {
      setLoginError("Invalid admin credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setSession(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_session");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-sm p-8 rounded-3xl glass-panel relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800" />
          
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-zinc-950/60 border border-zinc-850 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-wider">Secure CMS Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kareemeltemsah7@gmail.com"
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/10 focus:border-zinc-500/80 px-4 py-3 text-xs text-white focus:outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/10 focus:border-zinc-500/80 px-4 py-3 text-xs text-white focus:outline-none transition-all"
              />
            </div>

            {loginError && (
              <span className="text-xs text-red-500 font-medium text-center">
                {loginError}
              </span>
            )}

            <button
              type="submit"
              className="rounded-xl bg-white hover:bg-zinc-200 text-black py-3.5 text-xs font-semibold transition-all mt-2"
            >
              Authenticate
            </button>
          </form>
        </div>
        <Link href="/" className="text-xs text-zinc-650 hover:text-zinc-400 mt-8 border-b border-transparent hover:border-zinc-600 pb-0.5 transition-all">
          Return to portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-200 flex flex-col md:flex-row">
      {/* Sidebar Panel Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-900 bg-black p-6 flex flex-col justify-between flex-shrink-0">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              Kareem<span className="text-zinc-500 font-normal">Tamer</span>
              <span className="text-[9px] bg-zinc-900 text-zinc-400 border border-zinc-850 px-1.5 py-0.5 rounded uppercase font-mono">Admin</span>
            </h2>
            <span className="text-[10px] font-mono text-zinc-600">kareemeltemsah7@gmail.com</span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {[
              { id: "analytics", label: "Analytics Stats", icon: <TrendingUp className="w-4 h-4" /> },
              { id: "messages", label: "Inbox Messages", icon: <MessageSquare className="w-4 h-4" /> },
              { id: "projects", label: "Projects CRUD", icon: <FolderOpen className="w-4 h-4" /> },
              { id: "services", label: "Services CRUD", icon: <FileSpreadsheet className="w-4 h-4" /> },
              { id: "skills", label: "Skills CRUD", icon: <BookOpen className="w-4 h-4" /> },
              { id: "experience", label: "Experience CRUD", icon: <Calendar className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-950"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-zinc-900 flex flex-col gap-3">
          <Link href="/" className="text-xs text-zinc-450 hover:text-white transition-colors">
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-red-500 hover:text-red-400 text-left font-semibold"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "analytics" && <AnalyticsManager />}
        {activeTab === "messages" && <MessagesInbox />}
        {activeTab === "projects" && <CRUDBoard table="projects" title="Projects" fields={["title", "slug", "category", "status", "tagline"]} />}
        {activeTab === "services" && <CRUDBoard table="services" title="Services" fields={["title", "price", "delivery_time", "description"]} />}
        {activeTab === "skills" && <CRUDBoard table="skills" title="Skills" fields={["name", "category", "proficiency"]} />}
        {activeTab === "experience" && <CRUDBoard table="experience" title="Experience" fields={["company", "position", "dates", "description"]} />}
      </main>
    </div>
  );
}

// 1. Analytics Component
function AnalyticsManager() {
  const [stats, setStats] = useState({
    pageViews: 0,
    projectClicks: 0,
    serviceClicks: 0,
    contactMessages: 0
  });

  useEffect(() => {
    async function loadAnalytics() {
      const { data } = await supabase.from("analytics").select("*");
      const { data: messages } = await supabase.from("messages").select("*");
      if (data) {
        setStats({
          pageViews: data.filter((e: any) => e.event_type === "page_view").length,
          projectClicks: data.filter((e: any) => e.event_type === "project_click").length,
          serviceClicks: data.filter((e: any) => e.event_type === "service_click").length,
          contactMessages: messages ? messages.length : 0
        });
      }
    }
    loadAnalytics();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Analytics Overview</h1>
        <p className="text-xs text-zinc-500 mt-1">Real-time engagement telemetry counters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Page Views", value: stats.pageViews, color: "text-blue-400" },
          { label: "Project Clicks", value: stats.projectClicks, color: "text-purple-400" },
          { label: "Service Marketplace Clicks", value: stats.serviceClicks, color: "text-emerald-400" },
          { label: "Contact Inquiries", value: stats.contactMessages, color: "text-amber-400" }
        ].map((c, i) => (
          <div key={i} className="p-6 rounded-2xl glass-panel">
            <span className="text-[10px] uppercase tracking-wider text-zinc-550 font-mono block mb-2">{c.label}</span>
            <span className={`text-4xl font-bold tracking-tight font-mono ${c.color}`}>{c.value}</span>
          </div>
        ))}
      </div>

      {/* Interactive telemetry details log */}
      <div className="p-6 rounded-2xl glass-panel">
        <h3 className="text-sm font-semibold text-white mb-4">Click Telemetry Log</h3>
        <div className="h-64 overflow-y-auto flex flex-col gap-2 pr-2">
          <div className="flex text-[10px] font-mono uppercase text-zinc-550 tracking-wider pb-2 border-b border-zinc-900">
            <span className="w-1/3">Event Type</span>
            <span className="w-1/3">Target ID / Path</span>
            <span className="w-1/3 text-right">Timestamp</span>
          </div>
          <p className="text-xs text-zinc-500 text-center py-8">Connecting live telemetry data feed...</p>
        </div>
      </div>
    </div>
  );
}

// 2. Messages Inbox Component
function MessagesInbox() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    async function loadMessages() {
      const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
      if (data) setMessages(data);
    }
    loadMessages();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (!error) {
      setMessages(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleExportCSV = () => {
    if (messages.length === 0) return;
    const headers = ["Name", "Email", "Subject", "Message", "Created At"];
    const rows = messages.map(m => [
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${(m.subject || "").replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      `"${m.created_at}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kareemtamer_contacts_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Inbox Messages</h1>
          <p className="text-xs text-zinc-500 mt-1">Review contact forms submissions</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="rounded-xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-350 hover:text-white transition-all flex items-center gap-1.5"
        >
          <FileSpreadsheet className="w-4 h-4" /> Export to CSV
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="text-center text-zinc-500 py-16 font-mono text-xs">NO MESSAGES INBOX</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="p-6 rounded-2xl glass-panel flex flex-col justify-between gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-zinc-900">
                <div>
                  <h3 className="text-sm font-bold text-white">{msg.subject || "No Subject"}</h3>
                  <span className="text-xs text-zinc-500 font-mono">
                    From: {msg.name} ({msg.email})
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-zinc-550 font-mono">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-500 hover:text-red-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed bg-black/40 p-4 rounded-xl font-mono">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 3. Dynamic CRUDBoard Component (Projects, Services, Skills, Experience)
interface CRUDProps {
  table: string;
  title: string;
  fields: string[];
}

function CRUDBoard({ table, title, fields }: CRUDProps) {
  const [items, setItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  const loadData = async () => {
    const { data } = await supabase.from(table).select("*");
    if (data) setItems(data);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleOpenCreate = () => {
    const initialForm: any = {};
    fields.forEach(f => {
      initialForm[f] = "";
    });
    setEditItem(initialForm);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    // Convert list string variables back to array if applicable
    const payload = { ...editItem };
    if (payload.tags && typeof payload.tags === "string") {
      payload.tags = payload.tags.split(",").map((t: string) => t.trim());
    }
    if (payload.features && typeof payload.features === "string") {
      payload.features = payload.features.split(",").map((f: string) => f.trim());
    }

    if (payload.id) {
      // Update
      const { error } = await supabase.from(table).update(payload).eq("id", payload.id);
      if (!error) loadData();
    } else {
      // Insert
      const { error } = await supabase.from(table).insert(payload);
      if (!error) loadData();
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{title} Database</h1>
          <p className="text-xs text-zinc-500 mt-1">Create, update, and manage entries</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="rounded-xl bg-white hover:bg-zinc-200 text-black px-4 py-2.5 text-xs font-semibold transition-all"
        >
          Add New {title}
        </button>
      </div>

      {isEditing ? (
        <div className="p-6 rounded-2xl glass-panel relative">
          <h3 className="text-sm font-bold text-white mb-6">
            {editItem?.id ? `Edit ${title} Entry` : `Create New ${title} Entry`}
          </h3>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field} className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">{field}</label>
                {field === "description" ? (
                  <textarea
                    required
                    rows={4}
                    value={editItem?.[field] || ""}
                    onChange={(e) => setEditItem({ ...editItem, [field]: e.target.value })}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-xs text-white focus:outline-none transition-all"
                  />
                ) : (
                  <input
                    type="text"
                    required
                    value={editItem?.[field] || ""}
                    onChange={(e) => setEditItem({ ...editItem, [field]: e.target.value })}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-xs text-white focus:outline-none transition-all"
                  />
                )}
              </div>
            ))}

            <div className="flex items-center gap-3 mt-4">
              <button
                type="submit"
                className="rounded-xl bg-white hover:bg-zinc-200 text-black px-5 py-2.5 text-xs font-semibold transition-all"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl border border-zinc-800 px-5 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-900 bg-black/60 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                <th className="p-4">Content Title / Name</th>
                <th className="p-4">Details Summary</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-zinc-550 py-16 font-mono text-xs">
                    NO DATABASE RECORDS
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-b border-zinc-900 last:border-0 hover:bg-zinc-950/20 text-xs">
                    <td className="p-4 font-bold text-white">{item.title || item.name || item.company}</td>
                    <td className="p-4 text-zinc-400 max-w-xs truncate">{item.tagline || item.price || item.category || item.position}</td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setEditItem(item); setIsEditing(true); }}
                        className="text-xs text-zinc-400 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
