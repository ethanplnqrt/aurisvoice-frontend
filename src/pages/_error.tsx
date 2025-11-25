import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          {statusCode || 'Erreur'}
        </h1>
        <p className="text-white/60 text-lg">
          {statusCode === 404
            ? 'Page non trouvée'
            : statusCode === 500
            ? 'Erreur serveur'
            : 'Une erreur est survenue'}
        </p>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

