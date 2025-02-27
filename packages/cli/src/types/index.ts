export interface ProjectAnswers {
    name: string;
    description: string;
    author: string;
    registry: string;
}

export interface ComponentAnswers {
    type: string;
    name: string;
    description: string;
}

export interface CliOptions {
    templateRepo: string;
    defaultRegistry: string;
}
