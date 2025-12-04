export class RouteConfig {
    private  root = "/";
    [key: string]: string;

    HOME = this.root;
    TASK_BOARD = 'taskBoard';
    DASHBOARD = 'dashboard';
    MESSAGES = 'messages';
    LOGIN = 'login';
    SIGNUP = 'signup';
    PROFILE = 'profile'
    OVERVIEW = 'overview'
    MY_TASK = 'my_task'
    APPLICATIONS = 'applications'
    NOTIFICATIONS = 'notifications'
    SETTINGS = 'settings'
    
}
export const ROUTES = new RouteConfig();