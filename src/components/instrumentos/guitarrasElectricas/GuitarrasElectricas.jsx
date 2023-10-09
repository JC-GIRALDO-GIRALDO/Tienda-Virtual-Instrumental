import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";

function GuitarrasElectricas() {
  const [guitarras, setGuitarras] = useState([]);
  const [error, setError] = useState(null); // Estado para almacenar errores

  useEffect(() => {
    fetch("http://localhost:3000/guitarrasElectricas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no pudo completarse con éxito");
        }
        return response.json();
      })
      .then((data) => {
        setGuitarras(data); // Almacenar los datos en el estado
      })
      .catch((error) => {
        console.error(error);
        setError("Error al cargar los datos"); // Establecer el mensaje de error
      });
  }, []);

  return (
    <div>
      <h1>Guitarras Eléctricas</h1>
      {error && <p>{error}</p>}
      <Flex flexWrap="wrap" justifyContent="center">
        {guitarras.map((guitarra) => (
          <React.Fragment key={guitarra.id}>
            <Card maxW="sm" width="300px" m="2">
              <CardBody>
                <Image
                  src={guitarra.imagen}
                  alt={guitarra.nombre}
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{guitarra.nombre}</Heading>
                  <Text>{guitarra.descripcion}</Text>
                  <Text color="blue.600" fontSize="2xl">
                    {guitarra.precio}
                  </Text>
                </Stack>
              </CardBody>
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    Comprar ahora
                  </Button>
                  <Button variant="ghost" colorScheme="blue">
                    Agregar al carrito
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </React.Fragment>
        ))}
      </Flex>
    </div>
  );
}

export default GuitarrasElectricas;
