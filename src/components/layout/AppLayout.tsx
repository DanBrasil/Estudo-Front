import { Container, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { Link, Outlet } from "react-router-dom";
import { routes } from "@/app/routes";
import styles from "./AppLayout.module.css";

export const AppLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <Container size="4" px="4">
          <Flex align="center" justify="between" py="3">
            <Link
              to={routes.home}
              aria-label="Ir para a pagina inicial"
              className={styles.brandLink}
            >
              <Heading as="h1" size="5">
                EstudoFront
              </Heading>
            </Link>
            <Text size="2" color="gray">
              Trilhas de estudo de programacao
            </Text>
          </Flex>
        </Container>
      </header>
      <Separator size="4" />
      <main className={styles.main}>
        <Container size="4" px="4">
          <Outlet />
        </Container>
      </main>
    </>
  );
};
