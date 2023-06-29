export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			PortfolioProperties: {
				Row: {
					created_at: string | null;
					number_of_shares: number | null;
					portfolio_id: string;
					property_id: string;
				};
				Insert: {
					created_at?: string | null;
					number_of_shares?: number | null;
					portfolio_id: string;
					property_id: string;
				};
				Update: {
					created_at?: string | null;
					number_of_shares?: number | null;
					portfolio_id?: string;
					property_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'PortfolioProperties_property_id_fkey';
						columns: ['property_id'];
						referencedRelation: 'Properties';
						referencedColumns: ['id'];
					}
				];
			};
			Portfolios: {
				Row: {
					account_value: number | null;
					created_at: string | null;
					user_id: string;
				};
				Insert: {
					account_value?: number | null;
					created_at?: string | null;
					user_id: string;
				};
				Update: {
					account_value?: number | null;
					created_at?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'Portfolios_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'Profiles';
						referencedColumns: ['id'];
					}
				];
			};
			Profiles: {
				Row: {
					created_at: string | null;
					email: string | null;
					first_name: string | null;
					id: string;
					last_name: string | null;
					verified: boolean | null;
				};
				Insert: {
					created_at?: string | null;
					email?: string | null;
					first_name?: string | null;
					id: string;
					last_name?: string | null;
					verified?: boolean | null;
				};
				Update: {
					created_at?: string | null;
					email?: string | null;
					first_name?: string | null;
					id?: string;
					last_name?: string | null;
					verified?: boolean | null;
				};
				Relationships: [
					{
						foreignKeyName: 'Profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			Properties: {
				Row: {
					address: string;
					city: string | null;
					created_at: string | null;
					document_links: string[] | null;
					id: string;
					image_url: string | null;
					property_type: string | null;
					state: string;
					zip: number;
				};
				Insert: {
					address: string;
					city?: string | null;
					created_at?: string | null;
					document_links?: string[] | null;
					id?: string;
					image_url?: string | null;
					property_type?: string | null;
					state: string;
					zip: number;
				};
				Update: {
					address?: string;
					city?: string | null;
					created_at?: string | null;
					document_links?: string[] | null;
					id?: string;
					image_url?: string | null;
					property_type?: string | null;
					state?: string;
					zip?: number;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null;
					avif_autodetection: boolean | null;
					created_at: string | null;
					file_size_limit: number | null;
					id: string;
					name: string;
					owner: string | null;
					public: boolean | null;
					updated_at: string | null;
				};
				Insert: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id: string;
					name: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Update: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id?: string;
					name?: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'buckets_owner_fkey';
						columns: ['owner'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			migrations: {
				Row: {
					executed_at: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Insert: {
					executed_at?: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Update: {
					executed_at?: string | null;
					hash?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			objects: {
				Row: {
					bucket_id: string | null;
					created_at: string | null;
					id: string;
					last_accessed_at: string | null;
					metadata: Json | null;
					name: string | null;
					owner: string | null;
					path_tokens: string[] | null;
					updated_at: string | null;
					version: string | null;
				};
				Insert: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Update: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey';
						columns: ['bucket_id'];
						referencedRelation: 'buckets';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'objects_owner_fkey';
						columns: ['owner'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string;
					name: string;
					owner: string;
					metadata: Json;
				};
				Returns: undefined;
			};
			extension: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			filename: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			foldername: {
				Args: {
					name: string;
				};
				Returns: unknown;
			};
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>;
				Returns: {
					size: number;
					bucket_id: string;
				}[];
			};
			search: {
				Args: {
					prefix: string;
					bucketname: string;
					limits?: number;
					levels?: number;
					offsets?: number;
					search?: string;
					sortcolumn?: string;
					sortorder?: string;
				};
				Returns: {
					name: string;
					id: string;
					updated_at: string;
					created_at: string;
					last_accessed_at: string;
					metadata: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
