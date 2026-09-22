import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { routes } from "@/app/routes";

export const NotFoundPage = () => {
  return (
    <Flex direction="column" align="center" gap="4" py="9">
      <Heading as="h2" size="7">
        Pagina nao encontrada
      </Heading>
      <Text color="gray" align="center">
        O endereco pode estar errado ou o conteudo foi movido.
      </Text>
      <Button asChild variant="soft">
        <Link to={routes.home}>Voltar para as categorias</Link>
      </Button>
    </Flex>
  );
};
