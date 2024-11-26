import { useState } from "react";
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
  useMediaQuery,
  Typography,
  Card,
  CardContent,
  // TablePagination,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useFetchUserDetails } from "@/hooks/useFetchUserDetails";
import { useDeleteUser } from "@/hooks/useDeleteUser";

const UsersTable = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useFetchUserDetails();
  const { mutate: deleteUser } = useDeleteUser();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the view is mobile-sized

  // Pagination state
  const [page /*setPage*/] = useState(0);
  const [rowsPerPage /* setRowsPerPage*/] = useState(6); // Set rows per page to 6

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

  // Handle page change
  // const handleChangePage = (newPage: number) => {
  //   setPage(newPage);
  // };

  // Handle rows per page change
  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users.</p>;

  // Slice users array for pagination
  const paginatedUsers: any = Array.isArray(users)
    ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

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

      {/* Responsive table for desktop and card view for mobile */}
      {isMobile ? (
        <Box>
          {Array.isArray(users) && users.length > 0 ? (
            paginatedUsers.map((user: any, index: any) => (
              <Card key={index} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {user.phone}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Role:</strong> {user.role}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 1,
                    }}
                  >
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
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No users found.</Typography>
          )}
        </Box>
      ) : (
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
                paginatedUsers.map((user: any, index: any) => (
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

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
              width: "100%", // Ensure pagination takes full width on mobile
            }}
          >
            {/* <TablePagination
              component="div"
              count={users?.length || 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[6, 12, 24]} // Optional: modify if needed
              sx={{
                "& .MuiTablePagination-toolbar": {
                  display: "flex",
                  justifyContent: isMobile ? "space-between" : "center", // Space between for mobile
                  flexDirection: isMobile ? "column" : "row", // Stack on mobile
                  padding: isMobile ? "10px 0" : "0", // Padding for better mobile experience
                },
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-displayedRows":
                  {
                    fontSize: isMobile ? "0.875rem" : "1rem", // Smaller font size for mobile
                  },
                "& .MuiTablePagination-actions": {
                  display: "flex",
                  justifyContent: "center", // Center actions on all views
                  width: isMobile ? "100%" : "auto", // Full width for mobile
                },
              }}
            /> */}
          </Box>
        </TableContainer>
      )}
    </>
  );
};

export default UsersTable;
