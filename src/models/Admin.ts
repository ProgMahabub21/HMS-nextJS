export interface Admin {
    id:         number;
    firstName:  string;
    lastName:   string;
    middleName: string;
    email:      string;
    password:   string;
    phone:      string;
    isDisabled: boolean;
    img:        string;
    doctors:    any[];
    patients:   any[];
}