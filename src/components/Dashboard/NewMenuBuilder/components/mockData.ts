export interface MenuItem {
  id: string;
  image: string; // Placeholder or URL
  name: string;
  sku: string;
  category: string;
  price: number;
  type: string;
  tags: string[];
}

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
  {
    id: "2",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
  {
    id: "3",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
  {
    id: "4",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
  {
    id: "5",
    image: "",
    name: "Special Burger",
    sku: "BURGER-001",
    category: "Burgers",
    price: 1200,
    type: "Local",
    tags: ["Special", "Popular"],
  },
];

export interface Category {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  branch: "Local" | "Global";
}

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Burger",
    status: "Active",
    branch: "Local",
  },
  {
    id: "2",
    name: "Burger",
    status: "Inactive",
    branch: "Global",
  },
  {
    id: "3",
    name: "Burger",
    status: "Active",
    branch: "Global",
  },
  {
    id: "4",
    name: "Burger",
    status: "Active",
    branch: "Global",
  },
  {
    id: "5",
    name: "Burger",
    status: "Active",
    branch: "Local",
  },
];

export const statsData = [
  { label: "Total items", value: 90 },
  { label: "Categories", value: 8 },
  { label: "Global items", value: 34 },
  { label: "Local items", value: 56 },
];
