declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"api/core-old.md": {
	id: "api/core-old.md";
  slug: "api/core-old";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"api/core.md": {
	id: "api/core.md";
  slug: "api/core";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"api/core2.md": {
	id: "api/core2.md";
  slug: "api/core2";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"api/custom-drawing-tools.mdx": {
	id: "api/custom-drawing-tools.mdx";
  slug: "api/custom-drawing-tools";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/custom-theme-builder.mdx": {
	id: "api/custom-theme-builder.mdx";
  slug: "api/custom-theme-builder";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/export-chart-image.mdx": {
	id: "api/export-chart-image.mdx";
  slug: "api/export-chart-image";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/indicator-alerts.mdx": {
	id: "api/indicator-alerts.mdx";
  slug: "api/indicator-alerts";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/mobile-responsive.mdx": {
	id: "api/mobile-responsive.mdx";
  slug: "api/mobile-responsive";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/multi-chart-sync.mdx": {
	id: "api/multi-chart-sync.mdx";
  slug: "api/multi-chart-sync";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/real-time-websocket.mdx": {
	id: "api/real-time-websocket.mdx";
  slug: "api/real-time-websocket";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"documentation.mdx": {
	id: "documentation.mdx";
  slug: "documentation";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/01_static_chart.mdx": {
	id: "examples/01_static_chart.mdx";
  slug: "examples/01_static_chart";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/02_live_history_chart.mdx": {
	id: "examples/02_live_history_chart.mdx";
  slug: "examples/02_live_history_chart";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/custom-drawing-tools.mdx": {
	id: "examples/custom-drawing-tools.mdx";
  slug: "examples/custom-drawing-tools";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/custom-theme-builder.mdx": {
	id: "examples/custom-theme-builder.mdx";
  slug: "examples/custom-theme-builder";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/custom_indicator.mdx": {
	id: "examples/custom_indicator.mdx";
  slug: "examples/custom_indicator";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/export-chart-image.mdx": {
	id: "examples/export-chart-image.mdx";
  slug: "examples/export-chart-image";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/features.mdx": {
	id: "examples/features.mdx";
  slug: "examples/features";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/indicator-alerts.mdx": {
	id: "examples/indicator-alerts.mdx";
  slug: "examples/indicator-alerts";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/mobile-responsive.mdx": {
	id: "examples/mobile-responsive.mdx";
  slug: "examples/mobile-responsive";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/multi-chart-sync.mdx": {
	id: "examples/multi-chart-sync.mdx";
  slug: "examples/multi-chart-sync";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/real-time-websocket.mdx": {
	id: "examples/real-time-websocket.mdx";
  slug: "examples/real-time-websocket";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"examples/static_chart.mdx": {
	id: "examples/static_chart.mdx";
  slug: "examples/static_chart";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"guides/accessibility.md": {
	id: "guides/accessibility.md";
  slug: "guides/accessibility";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/backend/data-caching-strategies.md": {
	id: "guides/backend/data-caching-strategies.md";
  slug: "guides/backend/data-caching-strategies";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/backend/graphql-integration.md": {
	id: "guides/backend/graphql-integration.md";
  slug: "guides/backend/graphql-integration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/backend/rest-api-integration.md": {
	id: "guides/backend/rest-api-integration.md";
  slug: "guides/backend/rest-api-integration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/backend/websocket-integration.md": {
	id: "guides/backend/websocket-integration.md";
  slug: "guides/backend/websocket-integration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/comparison.md": {
	id: "guides/comparison.md";
  slug: "guides/comparison";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/contributing.md": {
	id: "guides/contributing.md";
  slug: "guides/contributing";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/custom_indicator.mdx": {
	id: "guides/custom_indicator.mdx";
  slug: "guides/custom_indicator";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"guides/data-management.md": {
	id: "guides/data-management.md";
  slug: "guides/data-management";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/deployment/cdn-deployment.md": {
	id: "guides/deployment/cdn-deployment.md";
  slug: "guides/deployment/cdn-deployment";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/deployment/production-checklist.md": {
	id: "guides/deployment/production-checklist.md";
  slug: "guides/deployment/production-checklist";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/deployment/security-considerations.md": {
	id: "guides/deployment/security-considerations.md";
  slug: "guides/deployment/security-considerations";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/deployment/vite-config.md": {
	id: "guides/deployment/vite-config.md";
  slug: "guides/deployment/vite-config";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/deployment/webpack-config.md": {
	id: "guides/deployment/webpack-config.md";
  slug: "guides/deployment/webpack-config";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/development/build-process.md": {
	id: "guides/development/build-process.md";
  slug: "guides/development/build-process";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/development/contributing-code.md": {
	id: "guides/development/contributing-code.md";
  slug: "guides/development/contributing-code";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/development/debugging-tips.md": {
	id: "guides/development/debugging-tips.md";
  slug: "guides/development/debugging-tips";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/development/local-setup.md": {
	id: "guides/development/local-setup.md";
  slug: "guides/development/local-setup";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/faq.md": {
	id: "guides/faq.md";
  slug: "guides/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/framework-integration/angular-integration.md": {
	id: "guides/framework-integration/angular-integration.md";
  slug: "guides/framework-integration/angular-integration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/framework-integration/nextjs-integration.md": {
	id: "guides/framework-integration/nextjs-integration.md";
  slug: "guides/framework-integration/nextjs-integration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/framework-integration/react-integration.md": {
	id: "guides/framework-integration/react-integration.md";
  slug: "guides/framework-integration/react-integration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/framework-integration/svelte-integration.md": {
	id: "guides/framework-integration/svelte-integration.md";
  slug: "guides/framework-integration/svelte-integration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/framework-integration/vue-integration.md": {
	id: "guides/framework-integration/vue-integration.md";
  slug: "guides/framework-integration/vue-integration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/howto.md": {
	id: "guides/howto.md";
  slug: "guides/howto";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/i18n.md": {
	id: "guides/i18n.md";
  slug: "guides/i18n";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/known_bugs_issues.md": {
	id: "guides/known_bugs_issues.md";
  slug: "guides/known_bugs_issues";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/performance.md": {
	id: "guides/performance.md";
  slug: "guides/performance";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/recipes/add-custom-buttons.md": {
	id: "guides/recipes/add-custom-buttons.md";
  slug: "guides/recipes/add-custom-buttons";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/recipes/change-colors-dynamically.md": {
	id: "guides/recipes/change-colors-dynamically.md";
  slug: "guides/recipes/change-colors-dynamically";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/recipes/custom-tooltips.md": {
	id: "guides/recipes/custom-tooltips.md";
  slug: "guides/recipes/custom-tooltips";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/recipes/keyboard-shortcuts.md": {
	id: "guides/recipes/keyboard-shortcuts.md";
  slug: "guides/recipes/keyboard-shortcuts";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/recipes/multi-language-support.md": {
	id: "guides/recipes/multi-language-support.md";
  slug: "guides/recipes/multi-language-support";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/recipes/save-restore-chart-state.md": {
	id: "guides/recipes/save-restore-chart-state.md";
  slug: "guides/recipes/save-restore-chart-state";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/repurpose_indicators.md": {
	id: "guides/repurpose_indicators.md";
  slug: "guides/repurpose_indicators";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/test.md": {
	id: "guides/test.md";
  slug: "guides/test";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/testing.md": {
	id: "guides/testing.md";
  slug: "guides/testing";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"reference/00_introduction.md": {
	id: "reference/00_introduction.md";
  slug: "reference/00_introduction";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/01_getting_started.md": {
	id: "reference/01_getting_started.md";
  slug: "reference/01_getting_started";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/02_configuration.md": {
	id: "reference/02_configuration.md";
  slug: "reference/02_configuration";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/annotations.md": {
	id: "reference/annotations.md";
  slug: "reference/annotations";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/api-examples.md": {
	id: "reference/api-examples.md";
  slug: "reference/api-examples";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/architecture.md": {
	id: "reference/architecture.md";
  slug: "reference/architecture";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/architecture/event-system.md": {
	id: "reference/architecture/event-system.md";
  slug: "reference/architecture/event-system";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/architecture/performance-internals.md": {
	id: "reference/architecture/performance-internals.md";
  slug: "reference/architecture/performance-internals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/architecture/plugin-architecture.md": {
	id: "reference/architecture/plugin-architecture.md";
  slug: "reference/architecture/plugin-architecture";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/architecture/rendering-pipeline.md": {
	id: "reference/architecture/rendering-pipeline.md";
  slug: "reference/architecture/rendering-pipeline";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/architecture/state-management-detailed.md": {
	id: "reference/architecture/state-management-detailed.md";
  slug: "reference/architecture/state-management-detailed";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/canvas_extension_layers.md": {
	id: "reference/canvas_extension_layers.md";
  slug: "reference/canvas_extension_layers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/canvas_methods.md": {
	id: "reference/canvas_methods.md";
  slug: "reference/canvas_methods";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/changelog.md": {
	id: "reference/changelog.md";
  slug: "reference/changelog";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/dataSource.md": {
	id: "reference/dataSource.md";
  slug: "reference/datasource";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/events.md": {
	id: "reference/events.md";
  slug: "reference/events";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/example.md": {
	id: "reference/example.md";
  slug: "reference/example";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/glossary.md": {
	id: "reference/glossary.md";
  slug: "reference/glossary";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/hit_detection.md": {
	id: "reference/hit_detection.md";
  slug: "reference/hit_detection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/index.md": {
	id: "reference/index.md";
  slug: "reference";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/indicators.md": {
	id: "reference/indicators.md";
  slug: "reference/indicators";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/indicators_custom.md": {
	id: "reference/indicators_custom.md";
  slug: "reference/indicators_custom";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/indicators_default.md": {
	id: "reference/indicators_default.md";
  slug: "reference/indicators_default";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/indicators_talib.md": {
	id: "reference/indicators_talib.md";
  slug: "reference/indicators_talib";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/legends.md": {
	id: "reference/legends.md";
  slug: "reference/legends";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/overlays.md": {
	id: "reference/overlays.md";
  slug: "reference/overlays";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/overlays_custom.md": {
	id: "reference/overlays_custom.md";
  slug: "reference/overlays_custom";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/overlays_news_events.md": {
	id: "reference/overlays_news_events.md";
  slug: "reference/overlays_news_events";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/overlays_trades.md": {
	id: "reference/overlays_trades.md";
  slug: "reference/overlays_trades";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/range.md": {
	id: "reference/range.md";
  slug: "reference/range";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/state.md": {
	id: "reference/state.md";
  slug: "reference/state";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/state_machine.md": {
	id: "reference/state_machine.md";
  slug: "reference/state_machine";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/streaming_price_data.md": {
	id: "reference/streaming_price_data.md";
  slug: "reference/streaming_price_data";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/themes.md": {
	id: "reference/themes.md";
  slug: "reference/themes";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/web_workers.md": {
	id: "reference/web_workers.md";
  slug: "reference/web_workers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"reference/widgets.md": {
	id: "reference/widgets.md";
  slug: "reference/widgets";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
