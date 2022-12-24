import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Tabs,
  Container,
  Title,
  Header,
  Paper,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons";
import data from "./data.json";
import { DatePicker } from "@mantine/dates";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface RowData {
  "Tanggal pengajuan": string;
  "ID karyawan": string;
  "Nama karyawan": string;
  Jabatan: string;
  "Tgl mulai bekerja": string;
  "Gaji(Rp)": string;
  "Permintaan (Rp)": string;
  "Biaya layanan (Rp)": string;
  "Pembayaran (Rp)": string;
  Status: string;
  "Status date": string;
  "Manager HR": string;
}

interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableSort({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <tr key={row["Nama karyawan"]}>
      <td>{row["Tanggal pengajuan"]}</td>
      <td>{row["ID karyawan"]}</td>
      <td>{row["Nama karyawan"]}</td>
      <td>{row.Jabatan}</td>
      <td>{row["Tgl mulai bekerja"]}</td>
      <td>{row["Gaji(Rp)"]}</td>
      <td>{row["Permintaan (Rp)"]}</td>
      <td>{row["Biaya layanan (Rp)"]}</td>
      <td>{row["Pembayaran (Rp)"]}</td>
      <td>{row["Status"]}</td>
      <td>{row["Status date"]}</td>
      <td>{row["Manager HR"]}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Title mt={30}>Riwayat Pengajuan</Title>
      <Group position="apart">
        <Group>
          <DatePicker placeholder="YYYY / MM / DD" />
          {"< >"}
          <DatePicker placeholder="YYYY / MM / DD" />
        </Group>
        <TextInput
          placeholder="Search by any field"
          my="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
      </Group>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === "Tgl mulai bekerja"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Tgl mulai bekerja")}
            >
              Tgl mulai bekerja
            </Th>
            <Th
              sorted={sortBy === "ID karyawan"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("ID karyawan")}
            >
              ID karyawan
            </Th>
            <Th
              sorted={sortBy === "Nama karyawan"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Nama karyawan")}
            >
              Nama karyawan
            </Th>
            <Th
              sorted={sortBy === "Jabatan"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Jabatan")}
            >
              Jabatan
            </Th>
            <Th
              sorted={sortBy === "Tgl mulai bekerja"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Tgl mulai bekerja")}
            >
              Tgl mulai bekerja
            </Th>
            <Th
              sorted={sortBy === "Gaji(Rp)"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Gaji(Rp)")}
            >
              Gaji(Rp)
            </Th>
            <Th
              sorted={sortBy === "Permintaan (Rp)"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Permintaan (Rp)")}
            >
              Permintaan (Rp)
            </Th>
            <Th
              sorted={sortBy === "Biaya layanan (Rp)"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Biaya layanan (Rp)")}
            >
              Biaya layanan (Rp)
            </Th>
            <Th
              sorted={sortBy === "Pembayaran (Rp)"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Pembayaran (Rp)")}
            >
              Pembayaran (Rp)
            </Th>
            <Th
              sorted={sortBy === "Status"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Status")}
            >
              Status
            </Th>
            <Th
              sorted={sortBy === "Status date"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Status date")}
            >
              Status date
            </Th>
            <Th
              sorted={sortBy === "Manager HR"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("Manager HR")}
            >
              Manager HR
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

export default function TabsContent() {
  return (
    <Container>
      <Tabs defaultValue="Pengajuan" mt={24}>
        <Header height={100}>
          <Group position="apart">
            <Tabs.List>
              <Tabs.Tab value="Pengajuan">Pengajuan</Tabs.Tab>
              <Tabs.Tab value="EWA">EWA</Tabs.Tab>
              <Tabs.Tab value="Permintaan pembayaran">
                Permintaan Pembayaran
              </Tabs.Tab>
            </Tabs.List>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,

                lineHeight: 12,
                padding: 0,
                margin: 0,
              }}
            >
              <Text size="sm" p={0} m={0} align={"left"}>
                PT SAYUR MERDEKA
              </Text>

              <Text color="dimmed" size="xs" p={0} m={0} align={"left"}>
                Irene Agustine
              </Text>
            </Paper>
          </Group>
        </Header>

        <Tabs.Panel value="Pengajuan">
          <Tabs defaultValue="Riwayat" ml={24}>
            <Tabs.List>
              <Tabs.Tab value="Tertunda">Tertunda</Tabs.Tab>
              <Tabs.Tab value="Riwayat">Riwayat</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="Tertunda">Tertunda</Tabs.Panel>
            <Tabs.Panel value="Riwayat">
              <TableSort data={data.data} />
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>

        <Tabs.Panel value="EWA" pt="xs">
          EWA
        </Tabs.Panel>

        <Tabs.Panel value="Permintaan pembayaran" pt="xs">
          Permintaan pembayaran
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
