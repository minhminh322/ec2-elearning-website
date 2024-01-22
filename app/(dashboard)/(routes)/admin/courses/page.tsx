import { getUserList } from "@/actions/admin/getUserList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CourseAdminPage = async () => {
  const data = await getUserList();
  console.log(data);
  return (
    <div>
      <h1>Course Admin Page</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Student's Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Create Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user, idx) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{idx}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">
                {user.createdAt.toString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseAdminPage;
