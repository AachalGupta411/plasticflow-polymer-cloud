export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80";

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1565514020169-1731ee8a5176?auto=format&fit=crop&w=1200&q=80";

export const DEFAULT_STATS = {
  plants: 38,
  production: "14.2 kt/day",
  yield: "94.2%",
  uptime: "99.98%",
};

export const PLANT_LOCATIONS = [
  {
    id: "mumbai",
    name: "Mumbai Plant",
    city: "Maharashtra, India",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "delhi",
    name: "Delhi Plant",
    city: "Delhi NCR, India",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "chennai",
    name: "Chennai Plant",
    city: "Tamil Nadu, India",
    status: "Maintenance",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9db8811af?auto=format&fit=crop&w=900&q=80",
  },
];

export const ANALYTICS_PREVIEW = [
  { month: "Jan", production: 118 },
  { month: "Feb", production: 132 },
  { month: "Mar", production: 145 },
  { month: "Apr", production: 158 },
  { month: "May", production: 142 },
  { month: "Jun", production: 168 },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Platform", href: "#capabilities" },
  { label: "Operations", href: "#operations" },
  { label: "Network", href: "#network" },
];

export const FOOTER_LINKS = {
  Company: [
    { label: "About", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "News", href: "#" },
  ],
  Platform: [
    { label: "Monitoring", href: "/monitoring" },
    { label: "Analytics", href: "/analytics" },
    { label: "Workflow", href: "/workflow" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Support", href: "#" },
  ],
  Contact: [
    { label: "sales@plasticflow.io", href: "mailto:sales@plasticflow.io" },
    { label: "+1 (800) 555-0142", href: "tel:+18005550142" },
    { label: "Global HQ · Houston", href: "#" },
  ],
};
