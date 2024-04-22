import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  Box,
  Modal,
  Fade,
  TextField,
} from "@mui/material";
import {
  useDeleteHouseMutation,
  useUpdateHouseMutation,
} from "services/houses";
import { useDispatch } from "react-redux";
import {
  deleteHouseThunk,
  addHouse,
  updateHouseState,
} from "state/housesSlice";

const House = ({
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
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteHouse] = useDeleteHouseMutation();
  const [updateHouse] = useUpdateHouseMutation();
  const dispatch = useDispatch();
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
  useEffect(() => {
    setHouseName(name);
    setHousePrice(price);
    setHouseFloorCount(floor_count);
    setHouseFootprint(building_footprint);
    setHouseHeight(house_height);
    setHouseGeneralSquare(general_square);
    setHouseLivingSquare(living_square);
    setPreviewImages(preview_images);
    setProjectImages(project_images);
  }, []);

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
    const projectImg = images.map((projim) => projim.secure_url);
    setProjectImages(projectImg);
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
    const previewImg = images.map((previm) => previm.secure_url);
    setPreviewImages(previewImg);
  };
  const handleDeleteHouse = async (_id) => {
    dispatch(deleteHouseThunk({ _id: _id }));
  };

  const handleSubmitHouse = async () => {
    const updateHouseDto = {
      _id,
      name: houseName,
      price: housePrice,
      floor_count: houseFloorCount,
      building_footprint: houseFootprint,
      house_height: houseHeight,
      general_square: houseGeneralSquare,
      living_square: houseLivingSquare,
      preview_images: previewImages,
      project_images: projectImages,
    };
    await updateHouse(updateHouseDto);
    dispatch(updateHouseState(updateHouseDto));
    setOpen(false);
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
        <Box color="#ffe39c" fontSize="18px" textAlign="center" mb="8px">
          {name}
        </Box>
        <Box display="flex">
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              borderRadius: "10px",
            }}
            src={`${preview_images[0]}`}
          />
          <Box ml="8px">
            <Typography>
              Ціна:{" "}
              <Typography color="#ffe39c" display="inline">
                {price}
              </Typography>{" "}
              грн.
            </Typography>
            <Typography>
              Кількість поверхів:{" "}
              <Typography color="#ffe39c" display="inline">
                {floor_count}{" "}
              </Typography>
            </Typography>
            <Typography>
              Кубатура:{" "}
              <Typography color="#ffe39c" display="inline">
                {building_footprint}{" "}
              </Typography>{" "}
              м²
            </Typography>
            <Typography>
              Висота:{" "}
              <Typography color="#ffe39c" display="inline">
                {house_height}{" "}
              </Typography>{" "}
              м
            </Typography>
            <Typography>
              Загальна площа:{" "}
              <Typography color="#ffe39c" display="inline">
                {general_square}{" "}
              </Typography>{" "}
              м²
            </Typography>
            <Typography mb="8px">
              Житлова площа:{" "}
              <Typography color="#ffe39c" display="inline">
                {living_square}{" "}
              </Typography>{" "}
              м²
            </Typography>
            <Button color="secondary" onClick={handleOpen}>
              Редагувати
            </Button>
            <Button
              color="error"
              sx={{ marginLeft: "16px" }}
              onClick={() => handleDeleteHouse(_id)}
            >
              Видалити
            </Button>
          </Box>
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
                    label={houseName ? `` : `Назва`}
                    value={houseName}
                    onChange={(e) => setHouseName(e.target.value)}
                  ></TextField>
                </Box>
                <Box display="flex" alignItems="center" gap="16px">
                  <Typography fontSize="20px">Ціна будинку:</Typography>
                  <TextField
                    type="number"
                    size="small"
                    color="secondary"
                    label={housePrice ? `` : `Ціна`}
                    value={housePrice}
                    onChange={(e) => setHousePrice(e.target.value)}
                  ></TextField>
                </Box>
                <Box display="flex" alignItems="center" gap="16px">
                  <Typography fontSize="20px">Кількість поверхів:</Typography>
                  <TextField
                    type="number"
                    size="small"
                    color="secondary"
                    label={houseFloorCount ? `` : `Поверхи`}
                    value={houseFloorCount}
                    onChange={(e) => setHouseFloorCount(e.target.value)}
                  ></TextField>
                </Box>
                <Box display="flex" alignItems="center" gap="16px">
                  <Typography fontSize="20px">Кубатура:</Typography>
                  <TextField
                    type="number"
                    size="small"
                    color="secondary"
                    label={houseFootprint ? `` : `Кубатура`}
                    value={houseFootprint}
                    onChange={(e) => setHouseFootprint(e.target.value)}
                  ></TextField>
                </Box>
                <Box display="flex" alignItems="center" gap="16px">
                  <Typography fontSize="20px">Висота будинку:</Typography>
                  <TextField
                    type="number"
                    size="small"
                    color="secondary"
                    label={houseHeight ? `` : `Висота`}
                    value={houseHeight}
                    onChange={(e) => setHouseHeight(e.target.value)}
                  ></TextField>
                </Box>
                <Box display="flex" alignItems="center" gap="16px">
                  <Typography fontSize="20px">Загальна площа:</Typography>
                  <TextField
                    type="number"
                    size="small"
                    color="secondary"
                    label={houseGeneralSquare ? `` : `Загальна площа`}
                    value={houseGeneralSquare}
                    onChange={(e) => setHouseGeneralSquare(e.target.value)}
                  ></TextField>
                </Box>
                <Box display="flex" alignItems="center" gap="16px">
                  <Typography fontSize="20px">Житлова площа:</Typography>
                  <TextField
                    type="number"
                    size="small"
                    color="secondary"
                    label={houseLivingSquare ? `` : `Житлова площа`}
                    value={houseLivingSquare}
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
                    {previewImages.map((pi) => (
                      <Box
                        component="img"
                        src={`${pi}`}
                        key={pi}
                        width="150px"
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
                    {projectImages.map((pi) => (
                      <Box
                        component="img"
                        src={`${pi}`}
                        key={pi}
                        width="150px"
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
                    onClick={handleSubmitHouse}
                  >
                    РЕДАГУВАТИ БУДИНОК
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Box>
      </CardContent>
    </Card>
  );
};

export default House;
