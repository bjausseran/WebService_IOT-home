
export interface IAuthentificator {
    login : (password: string, email?: string, username?: string) => any
    signin : (password: string, email: string, username: string) => any
    updateUser : (id: string, password: string, email: string, username: string) => any
}