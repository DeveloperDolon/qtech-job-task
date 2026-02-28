enum JobType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    CONTRACT = 'CONTRACT',
    INTERN = 'INTERN'
}

export type TJob = {
    title: string;
    description: string;
    company: string;
    location: string;
    salary: number;
    logo: File;
    jobType: JobType;
    tags: string[];
    vacancy: number;
    workingTime: string;
}
