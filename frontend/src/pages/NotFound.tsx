import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Home as HomeIcon } from 'lucide-react';
import { ROUTES } from '../utils/constants';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-tokopedia-500/20 text-tokopedia-500 flex items-center justify-center border border-tokopedia-500/30">
        <Play className="w-8 h-8 fill-tokopedia-500" />
      </div>
      <h1 className="text-4xl font-extrabold text-white tracking-tight">404</h1>
      <h2 className="text-lg font-bold text-gray-200">Halaman Tidak Ditemukan</h2>
      <p className="text-xs text-gray-400 max-w-md">
        Tayangan live streaming atau halaman yang Anda cari mungkin telah berakhir atau alamat URL salah.
      </p>
      <Link
        to={ROUTES.HOME}
        className="px-5 py-2.5 bg-tokopedia-500 hover:bg-tokopedia-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-tokopedia-500/30 inline-flex items-center gap-2 transition-transform active:scale-95"
      >
        <HomeIcon className="w-4 h-4" />
        Kembali ke Beranda
      </Link>
    </div>
  );
};
