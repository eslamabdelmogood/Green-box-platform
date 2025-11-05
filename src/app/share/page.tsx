
'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function SharePage() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use a publicly accessible URL for the QR code.
    const publicUrl = 'https://app.studio.dev';
    setAppUrl(publicUrl);
    
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
      publicUrl
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
            {isLoading ? (
                <p className="text-sm text-muted-foreground">Generating QR code...</p>
            ) : (
                <Link
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                    {appUrl}
                    <ExternalLink className="h-4 w-4" />
                </Link>
            )}
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
}
