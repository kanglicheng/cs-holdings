import { Database } from './schema';

export type PropertyTableRow =
	Database['public']['Tables']['Properties']['Row'];

export type PortfolioTableRow =
	Database['public']['Tables']['Portfolios']['Row'];
