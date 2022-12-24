import React from "react";
import {
  Anchor,
  AppShell,
  Button,
  Checkbox,
  Container,
  createStyles,
  Group,
  Header,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
    padding: `10px 50px`,
  },
}));

export default function Login() {
  const { classes } = useStyles();

  return (
    <AppShell
      header={
        <Header height={80}>
          <img
            src={logo}
            alt="logo"
            height={60}
            style={{ padding: "10px 20px" }}
          />
        </Header>
      }
    >
      <Container size={600} my={100}>
        <Title className={classes.title} align="center">
          Personal account for bussiness
        </Title>
        <Paper p={30} mt={50}>
          <Group position="apart">
            <TextInput
              placeholder="Phone number"
              radius={0}
              sx={{ width: "67%" }}
              required
            />
            <Button className={classes.control}>
              <Link style={{ textDecoration: "none" }} to={"./users"}>
                Next
              </Link>
            </Button>
          </Group>
          <Group position="center" mt={40}>
            <Text size={"md"}>Dont have an account yet?</Text>
            <Anchor p={0} color="dimmed" size="md" className={classes.control}>
              Sign up
            </Anchor>
          </Group>
          <Group position="center" mt="lg">
            <Checkbox />
            <Text>
              I agree with{" "}
              <Anchor
                color="dimmed"
                size="md"
                className={classes.control}
                p={0}
              >
                Term and Condition
              </Anchor>
              {` and `}
              <Anchor
                p={0}
                color="dimmed"
                size="md"
                className={classes.control}
              >
                Privacy policy
              </Anchor>
            </Text>
          </Group>
        </Paper>
      </Container>
    </AppShell>
  );
}
