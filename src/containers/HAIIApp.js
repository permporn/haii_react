import React from 'react';
import { Router, Route, Link, IndexRoute, IndexRedirect, createRoutes } from 'react-router';
import { showClientPanels } from './HAIIApp-props';
import Main from '../components/main/main';
import Home from '../components/main/content/home/home';
import Authorization from '../components/main/auth/auth';
import Charts from '../components/main/content/charts/charts';
import Map from '../components/widgets/map/map';
import Content from '../components/main/content';
import Auth from '../components/authorization/authorization';

const routes = [
    {
        component: Main,
        childRoutes: [
            {
                path: 'signin',
                component: Authorization
            },
            {
                component: Auth,
                childRoutes: [
                    {
                        component: Content,
                        childRoutes: [
                            {
                                component: Home,
                                childRoutes: [
                                    {
                                        path: '/',
                                        component: Map
                                    }
                                ]
                            },
                            {
                                path: '/charts',
                                component: Charts

                            }
                        ]
                    }
                ]
            }

        ]
    }
];
export default class extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <Router
                history={history}
                routes={routes}
            />
        );
    }
}