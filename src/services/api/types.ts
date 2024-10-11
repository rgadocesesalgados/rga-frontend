import { AxiosError } from 'axios'

export interface ErrorApi extends AxiosError<{ error: string }> {}
