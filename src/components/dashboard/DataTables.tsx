
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  lastLogin: string;
}

const mockData: TableData[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "2024-01-14" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive", lastLogin: "2024-01-10" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active", lastLogin: "2024-01-16" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-13" },
];

export const DataTables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof TableData>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredData = mockData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (field: keyof TableData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800"
                  onClick={() => handleSort("name")}
                >
                  Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800"
                  onClick={() => handleSort("email")}
                >
                  Email {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800"
                  onClick={() => handleSort("role")}
                >
                  Role {sortField === "role" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800"
                  onClick={() => handleSort("lastLogin")}
                >
                  Last Login {sortField === "lastLogin" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "Admin" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
                      user.role === "Editor" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Active" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
