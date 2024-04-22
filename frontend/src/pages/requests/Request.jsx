import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  Box,
  Link,
} from "@mui/material";
import { useDeleteRequestMutation } from "services/requests";
import { useDispatch } from "react-redux";
import { deleteRequestThunk } from "../../state/requestsSlice";

const Request = ({ _id, name, email, phone, comment, square }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteRequest] = useDeleteRequestMutation();
  const dispatch = useDispatch();
  const handleDeleteRequest = async (_id) => {
    dispatch(deleteRequestThunk({ _id: _id }));
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 18 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          Заказ: {_id}
        </Typography>
        <Box mt="1rem" fontSize="1.5rem" mb="12px">
          Дані заказчика:
        </Box>
        <Typography>
          <Typography display="inline" color={theme.palette.secondary[300]}>
            id:
          </Typography>{" "}
          {_id}
        </Typography>
        <Typography>
          <Typography display="inline" color={theme.palette.secondary[300]}>
            Площа:
          </Typography>{" "}
          {square} м&sup2;
        </Typography>
        <Typography>
          <Typography display="inline" color={theme.palette.secondary[300]}>
            Ім'я:
          </Typography>{" "}
          {name}
        </Typography>
        <Typography>
          <Typography display="inline" color={theme.palette.secondary[300]}>
            Імейл:
          </Typography>{" "}
          {email}
        </Typography>
        <Typography>
          <Typography display="inline" color={theme.palette.secondary[300]}>
            Номер телефону:
          </Typography>{" "}
          {phone}
        </Typography>
        {comment && (
          <Typography>
            <Typography display="inline" color={theme.palette.secondary[300]}>
              Коментар:
            </Typography>{" "}
            {comment}
          </Typography>
        )}

        <Button
          sx={{
            marginTop: "12px",
            color: "#dc143c",
            backgroundColor: "#191f45",
          }}
          onClick={() => handleDeleteRequest(_id)}
        >
          ВИДАЛИТИ
        </Button>
      </CardContent>
    </Card>
  );
};

export default Request;
