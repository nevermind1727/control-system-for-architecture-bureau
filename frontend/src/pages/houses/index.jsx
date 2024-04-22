import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Fade,
  Modal,
  TextField,
  IconButton,
  InputBase,
  useTheme,
} from "@mui/material";
import { useGetAllHousesQuery, useCreateHouseMutation } from "services/houses";
import Header from "../../components/Header";
import House from "./House";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Search } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { addHouse } from "../../state/housesSlice";
import FlexBetween from "../../components/FlexBetween";

const Houses = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const [createHouse] = useCreateHouseMutation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [houseName, setHouseName] = useState();
  const [housePrice, setHousePrice] = useState();
  const [houseFloorCount, setHouseFloorCount] = useState();
  const [houseFootprint, setHouseFootprint] = useState();
  const [houseHeight, setHouseHeight] = useState();
  const [houseGeneralSquare, setHouseGeneralSquare] = useState();
  const [houseLivingSquare, setHouseLivingSquare] = useState();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllHousesQuery({ page, pageSize, search });
  const dispatch = useDispatch();
  const houses = useSelector((state) => state.houses.houses);
  const handleOnProjectImagesDownload = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    let images = [];
    for (let i = 0; i < files.length; i++) {
      fd.append("file", files[i]);
      fd.append("upload_preset", "project_images");
      fd.append("api_key", "823441676242579");
      const result = await fetch(
        "https://api.cloudinary.com/v1_1/ddvy4wq6c/image/upload",
        { method: "POST", body: fd }
      ).then((r) => r.json());
      images.push(result);
    }
    setProjectImages(images);
  };
  const handleOnPreviewImagesDownload = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    let images = [];
    for (let i = 0; i < files.length; i++) {
      fd.append("file", files[i]);
      fd.append("upload_preset", "preview_images");
      fd.append("api_key", "823441676242579");
      const result = await fetch(
        "https://api.cloudinary.com/v1_1/ddvy4wq6c/image/upload",
        { method: "POST", body: fd }
      ).then((r) => r.json());
      images.push(result);
    }
    setPreviewImages(images);
  };

  const handleSubmit = async () => {
    const previewLinks = projectImages.map((projim) => projim.secure_url);
    const projectLinks = previewImages.map((previm) => previm.secure_url);
    const createHouseDto = {
      name: houseName,
      price: housePrice,
      floor_count: houseFloorCount,
      building_footprint: houseFootprint,
      house_height: houseHeight,
      general_square: houseGeneralSquare,
      living_square: houseLivingSquare,
      preview_images: previewLinks,
      project_images: projectLinks,
    };
    const newHouse = await createHouse(createHouseDto);
    dispatch(addHouse(newHouse));
    setOpen(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap="28px">
          <Header title="Будинки" subtitle="Лист будинків:" />
          <FlexBetween
            bgcolor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Шукати будинок" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </Box>
        <Button
          color="secondary"
          sx={{ fontSize: "24px" }}
          onClick={handleOpen}
        >
          <AddCircleIcon
            fontSize="large"
            color="secondary"
            sx={{ marginRight: "8px" }}
          />
          ДОДАТИ БУДИНОК
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          // slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          sx={{
            // position: "absolute",
            overflow: "scroll",
          }}
        >
          <Fade in={open}>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              sx={{
                transform: "translate(-50%, -50%)",
                width: 800,
                backgroundColor: "#0c0f22",
                border: "2px solid #000",
                borderRadius: "10px",
                boxShadow: 24,
                p: 4,
              }}
              display="flex"
              flexDirection="column"
              gap="16px"
            >
              <Box display="flex" alignItems="center" gap="16px">
                <Typography fontSize="20px">Назва будинку:</Typography>
                <TextField
                  size="small"
                  type="text"
                  color="secondary"
                  sx={{ width: 500 }}
                  label="Назва"
                  onChange={(e) => setHouseName(e.target.value)}
                ></TextField>
              </Box>
              <Box display="flex" alignItems="center" gap="16px">
                <Typography fontSize="20px">Ціна будинку:</Typography>
                <TextField
                  type="number"
                  size="small"
                  color="secondary"
                  label="Ціна"
                  onChange={(e) => setHousePrice(e.target.value)}
                ></TextField>
              </Box>
              <Box display="flex" alignItems="center" gap="16px">
                <Typography fontSize="20px">Кількість поверхів:</Typography>
                <TextField
                  type="number"
                  size="small"
                  color="secondary"
                  label="Поверхи"
                  onChange={(e) => setHouseFloorCount(e.target.value)}
                ></TextField>
              </Box>
              <Box display="flex" alignItems="center" gap="16px">
                <Typography fontSize="20px">Кубатура:</Typography>
                <TextField
                  type="number"
                  size="small"
                  color="secondary"
                  label="Кубатура"
                  onChange={(e) => setHouseFootprint(e.target.value)}
                ></TextField>
              </Box>
              <Box display="flex" alignItems="center" gap="16px">
                <Typography fontSize="20px">Висота будинку:</Typography>
                <TextField
                  type="number"
                  size="small"
                  color="secondary"
                  label="Висота"
                  onChange={(e) => setHouseHeight(e.target.value)}
                ></TextField>
              </Box>
              <Box display="flex" alignItems="center" gap="16px">
                <Typography fontSize="20px">Загальна площа:</Typography>
                <TextField
                  type="number"
                  size="small"
                  color="secondary"
                  label="Загальна площа"
                  onChange={(e) => setHouseGeneralSquare(e.target.value)}
                ></TextField>
              </Box>
              <Box display="flex" alignItems="center" gap="16px">
                <Typography fontSize="20px">Житлова площа:</Typography>
                <TextField
                  type="number"
                  size="small"
                  color="secondary"
                  label="Житлова площа"
                  onChange={(e) => setHouseLivingSquare(e.target.value)}
                ></TextField>
              </Box>
              <Box>
                <Typography fontSize="20px">Зображення будинку:</Typography>
                <Box
                  mt="20px"
                  display="grid"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  justifyContent="space-between"
                  rowGap="20px"
                  columnGap="1.33%"
                >
                  {projectImages.map((pi) => (
                    <Box
                      component="img"
                      src={`${pi.secure_url}`}
                      key={pi.secure_url}
                      width="100px"
                      height="100px"
                      borderRadius="10px"
                    ></Box>
                  ))}
                </Box>
              </Box>
              <Box>
                <input
                  type="file"
                  name="project_images"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                ></input>
                <Button
                  onClick={handleOnProjectImagesDownload}
                  color="secondary"
                >
                  ДОДАТИ ЗОБРАЖЕННЯ
                </Button>
              </Box>
              <Box>
                <Typography fontSize="20px">Креслення проекту:</Typography>
                <Box
                  mt="20px"
                  display="grid"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  justifyContent="space-between"
                  rowGap="20px"
                  columnGap="1.33%"
                >
                  {previewImages.map((pi) => (
                    <Box
                      component="img"
                      src={`${pi.secure_url}`}
                      key={pi.secure_url}
                      width="100px"
                      height="100px"
                      borderRadius="10px"
                    ></Box>
                  ))}
                </Box>
              </Box>
              <Box>
                <input
                  type="file"
                  name="project_images"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                ></input>
                <Button
                  onClick={handleOnPreviewImagesDownload}
                  color="secondary"
                >
                  ДОДАТИ КРЕСЛЕННЯ
                </Button>
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  color="secondary"
                  sx={{
                    backgroundColor: "#21295c",
                    py: "12px",
                    width: "300px",
                    fontSize: "18px",
                  }}
                  onClick={handleSubmit}
                >
                  ДОДАТИ БУДИНОК
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
      {houses || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {houses.map(
            ({
              _id,
              name,
              price,
              preview_images,
              project_images,
              floor_count,
              building_footprint,
              house_height,
              general_square,
              living_square,
            }) => (
              <House
                key={_id}
                _id={_id}
                name={name}
                price={price}
                preview_images={preview_images}
                project_images={project_images}
                floor_count={floor_count}
                building_footprint={building_footprint}
                house_height={house_height}
                general_square={general_square}
                living_square={living_square}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Houses;
