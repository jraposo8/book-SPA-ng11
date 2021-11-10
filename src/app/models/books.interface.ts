export interface IBook {
    title: string;
    description: string;
    imageSource: string;
    previewLink: string;
    id: string;
    author: string;
    isLent: boolean;
    lentDate?: Date;
    borrower: string;
    inCollection?: boolean;
}