import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetAllRequestsQuery } from "../../services/requests";
import Header from "../../components/Header";
import Request from "./Request";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getRequests } from "../../state/requestsSlice";

const Requests = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllRequestsQuery({
    page,
    pageSize,
    search,
  });
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllRequests = async () => {
      const response = await axios.get("http://localhost:3004/requests");
      dispatch(getRequests(response.data.requests));
    };
    fetchAllRequests();
  }, []);
  const requests = useSelector((state) => state.requests.requests);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Запроси на проектування"
        subtitle="Лист актуальних запросів на проектування нижче:"
      />
      {requests || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {requests.map(({ _id, name, email, phone, comment, square }) => (
            <Request
              key={_id}
              _id={_id}
              name={name}
              email={email}
              phone={phone}
              comment={comment}
              square={square}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Requests;
