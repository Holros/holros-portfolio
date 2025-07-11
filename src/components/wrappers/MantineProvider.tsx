"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
// import '@mantine/dates/styles.css';

export function MantineProviders({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
}
