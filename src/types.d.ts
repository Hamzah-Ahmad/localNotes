type Note = {
    id: string;
    title: string;
    text?: string;
    code?: string;
}

type Notes = Note[];

type Mode = 'Text' | 'Code'