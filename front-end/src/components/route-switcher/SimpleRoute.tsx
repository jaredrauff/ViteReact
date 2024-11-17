import React, { ReactElement } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Header from "@/layout/main-layout/MainLayout.tsx";

interface SimpleRouteProps extends RouteProps {
    component: React.ComponentType<Record<string, unknown>>;
}

const SimpleRoute = ({ component: Component, ...rest }: SimpleRouteProps): ReactElement => {
    return (
        <Route
            {...rest}
            render={(matchProps): ReactElement => (
                <>
                    <Header/>
                    {Component && <Component {...matchProps} />}
                </>
            )}
        />
    );
};

export default SimpleRoute;
