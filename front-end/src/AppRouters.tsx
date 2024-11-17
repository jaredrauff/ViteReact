import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import RouterUrlHelper from '@/core/utils/RouterUtils.ts';
import Home from '@/pages/home/Home.tsx';
import ProjectGallery from '@/pages/project-gallery/ProjectGallery.tsx';
import SimpleRoute from "@/components/route-switcher/SimpleRoute.tsx";

const AppRouters = (): React.ReactElement => (
    <BrowserRouter>
        <Switch>
            <SimpleRoute path={RouterUrlHelper.urlMap.home} exact component={Home} />
            <SimpleRoute path={RouterUrlHelper.urlMap.projectGallery} exact component={ProjectGallery} />
            {/*<Route component={NotFound} />*/}
            <Redirect to={RouterUrlHelper.urlMap.pageNotFound} />
        </Switch>
    </BrowserRouter>
);

export default AppRouters;
