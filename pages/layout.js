// app/layout.tsx

// globals.css includes @tailwind directives
// adjust the path if necessary
import "@/styles/globals.css";
import {Providers} from "./providers";
import { Navbar } from "@heroui/navbar";

export default function RootLayout(children) {
  return (
    <html lang="en" className='dark'>
      <body>
        
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}