
'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function SharePage() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This code runs on the client side, so `window.location.origin` is available.
    const currentUrl = window.location.origin;
    setAppUrl(currentUrl);
    
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
      currentUrl
    )}`;
    setQrCodeUrl(qrApiUrl);
    setIsLoading(false);
  }, []);

  return (
    <MainLayout>
      <Header title="Share App" />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Scan to View</CardTitle>
            <CardDescription>
              Share this QR code with the judges to open the app on their mobile devices.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative h-64 w-64">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <Image
                  src={qrCodeUrl}
                  alt="QR Code for the application"
                  width={256}
                  height={256}
                  className="rounded-lg border"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground break-all">
                {isLoading ? 'Generating QR code...' : appUrl}
            </p>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
}
