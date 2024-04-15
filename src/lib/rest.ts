const API_BASE = "http://localhost:15000/api/v1";

export interface Module {
    name: string;
    category: string;
    keyBind: number;
    enabled: boolean;
    description: string;
    hidden: boolean;
    aliases: string[];
}

export async function getModules(): Promise<Module[]> {
    const response = await fetch(`${API_BASE}/client/modules`);
    const data: [Module] = await response.json();

    return data;
}
