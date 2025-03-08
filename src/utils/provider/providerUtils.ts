import axios, { AxiosInstance } from "axios";

const baseUrl = ""; // Defina a base URL conforme necessário

class ApiProvider<T> {
  private api: AxiosInstance;
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.api = axios.create({ baseURL: baseUrl });
  }

  async getOne(id: string | number): Promise<T> {
    const response = await this.api.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async getMany(filter?: Record<string, any>): Promise<T[]> {
    const response = await this.api.get<T[]>(this.endpoint);
    let data = response.data as any;
    
    if (filter) {
      data = data.filter((item: { [x: string]: any; }) => 
        Object.entries(filter).every(([key, value]) => item[key] === value)
      );
    }
    
    return data;
  }

  async postOne(data: T): Promise<T> {
    const response = await this.api.post<T>(this.endpoint, data);
    return response.data;
  }

  async postMany(dataArray: T[]): Promise<T[]> {
    const results = await Promise.all(dataArray.map(data => this.postOne(data)));
    return results;
  }

  async putOne(id: string | number, data: Partial<T>): Promise<T> {
    const response = await this.api.put<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async putMany(dataArray: { id: string | number, data: Partial<T> }[]): Promise<T[]> {
    const results = await Promise.all(
      dataArray.map(({ id, data }) => this.putOne(id, data))
    );
    return results;
  }

  async deleteOne(id: string | number): Promise<boolean> {
    await this.api.delete(`${this.endpoint}/${id}`);
    return true;
  }

  async deleteMany(ids: (string | number)[]): Promise<number> {
    await Promise.all(ids.map(id => this.deleteOne(id)));
    return ids.length;
  }
}

export default ApiProvider;
