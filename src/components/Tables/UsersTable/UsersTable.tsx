import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useFetchUserDetails } from "@/hooks/useFetchUserDetails";
import { useDeleteUser } from "@/hooks/useDeleteUser";

const UsersTable = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useFetchUserDetails();
  const { mutate: deleteUser } = useDeleteUser();

  const handleEdit = (user: any) => {
    navigate(`/admin/dashboard/user/edit/${user._id}`, { state: { user } });
  };

  const handleDelete = async (user: any) => {
    const userId = user._id;
    deleteUser(userId);
  };

  const handleCreate = () => {
    navigate("/admin/dashboard/user/create");
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users.</p>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 2,
        }}
      >
        <Button
          sx={{ width: 120 }}
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(user)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
