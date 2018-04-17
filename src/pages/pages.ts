

import { SettingsPage } from './settings/settings';
import { TabsPage } from './tabs/tabs';

import { HomePage } from '../pages/home/home';
import { StatisticsPage } from '../pages/statistics/statistics';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TabsPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = HomePage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = HomePage;
export const Tab2Root = StatisticsPage;
export const Tab3Root = SettingsPage;
