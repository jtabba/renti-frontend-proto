import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export abstract class AxiosInstanceBase {
	protected readonly axiosInstance: AxiosInstance;

	protected constructor(baseUrl: string | undefined) {
		this.axiosInstance = axios.create({
			baseURL: baseUrl,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
}

export abstract class InterceptorBase extends AxiosInstanceBase {
	public constructor(baseUrl: string) {
		super(baseUrl);

		this.interceptAndAddAuthHeader();
	}

	private handleRequestAuthorisation = (
		config: InternalAxiosRequestConfig
	) => {
		const token = localStorage.getItem("token");

		if (token) {
			// we may change this method
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	};

	private interceptAndAddAuthHeader = () => {
		this.axiosInstance.interceptors.request.use(
			this.handleRequestAuthorisation
		);
	};
}
