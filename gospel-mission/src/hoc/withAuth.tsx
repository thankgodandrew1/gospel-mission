import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from ' @/components/LoadingSpinner';

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

const withAuth = (WrappedComponent: React.FC) => {
  const WithAuth = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!router.isReady) return;

      const { token } = router.query;

      //   console.log('Token from URL:', token);
      //   console.log('Secret Token:', SECRET_TOKEN);

      if (token === SECRET_TOKEN) {
        setIsAuthorized(true);
      } else {
        router.push('/unauthorized');
      }
    }, [router]);

    if (!isAuthorized) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <LoadingSpinner />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;
