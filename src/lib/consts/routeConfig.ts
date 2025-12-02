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
}
export const ROUTES = new RouteConfig();