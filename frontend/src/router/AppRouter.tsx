import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Home } from '../pages/Home';
import { VideoDetail } from '../pages/VideoDetail';
import { VideoSearch } from '../pages/VideoSearch';
import { NotFound } from '../pages/NotFound';
import { ROUTES } from '../utils/constants';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.VIDEO_SEARCH} element={<VideoSearch />} />
          <Route path={ROUTES.VIDEO_DETAIL} element={<VideoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
