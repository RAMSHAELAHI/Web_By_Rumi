import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/assets/styles/globals.css";
export const APP_NAME = "My App";
export const APP_DESCRIPTION = "This is a sample app.";
export const SERVER_URL = "https://example.com";

import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "@/components/ui/sonner";
// import { ErrorWrapper } from "./error-wrapper";

const roboto = Roboto({
    weight: ['300', '700'],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: '%s | Shoes Store',
        default: `${APP_NAME}`,
    },
    description: `${APP_DESCRIPTION}`,
    metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${roboto.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/* <ErrorWrapper> */}
                    {children}
                    <Toaster richColors />
                    {/* </ErrorWrapper> */}

                </ThemeProvider>

            </body>
        </html>
    );
}