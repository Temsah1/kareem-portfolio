export default async function sitemap() {
  const baseUrl = "https://kareemtamer.com";

  // Static routes list
  const routes = [
    "",
    "/admin"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  // Dynamic projects routes
  const projects = [
    "intelliops-ai",
    "ai-business-analytics",
    "restaurant-delivery",
    "expense-tracker",
    "url-shortener-api",
    "study-planner",
    "smart-saas-dashboard"
  ].map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  return [...routes, ...projects];
}
