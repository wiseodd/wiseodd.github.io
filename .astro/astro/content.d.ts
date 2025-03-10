declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
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
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
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
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"post": {
"annealed-importance-sampling.mdx": {
	id: "annealed-importance-sampling.mdx";
  slug: "annealed-importance-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"autoencoders.mdx": {
	id: "autoencoders.mdx";
  slug: "autoencoders";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"batchnorm.mdx": {
	id: "batchnorm.mdx";
  slug: "batchnorm";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"bayesian-regression.mdx": {
	id: "bayesian-regression.mdx";
  slug: "bayesian-regression";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"boundary-seeking-gan.mdx": {
	id: "boundary-seeking-gan.mdx";
  slug: "boundary-seeking-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"brouwers-fixed-point.mdx": {
	id: "brouwers-fixed-point.mdx";
  slug: "brouwers-fixed-point";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"chentsov-theorem.mdx": {
	id: "chentsov-theorem.mdx";
  slug: "chentsov-theorem";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"conditional-gan-tensorflow.mdx": {
	id: "conditional-gan-tensorflow.mdx";
  slug: "conditional-gan-tensorflow";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"conditional-vae.mdx": {
	id: "conditional-vae.mdx";
  slug: "conditional-vae";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"contractive-autoencoder.mdx": {
	id: "contractive-autoencoder.mdx";
  slug: "contractive-autoencoder";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"conv-probit.mdx": {
	id: "conv-probit.mdx";
  slug: "conv-probit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"convnet-conv-layer.mdx": {
	id: "convnet-conv-layer.mdx";
  slug: "convnet-conv-layer";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"convnet-maxpool-layer.mdx": {
	id: "convnet-maxpool-layer.mdx";
  slug: "convnet-maxpool-layer";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"coupled-gan.mdx": {
	id: "coupled-gan.mdx";
  slug: "coupled-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"deploying-wagtail.mdx": {
	id: "deploying-wagtail.mdx";
  slug: "deploying-wagtail";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"developing-wagtail.mdx": {
	id: "developing-wagtail.mdx";
  slug: "developing-wagtail";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"dropout.mdx": {
	id: "dropout.mdx";
  slug: "dropout";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"fisher-information.mdx": {
	id: "fisher-information.mdx";
  slug: "fisher-information";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"forward-reverse-kl.mdx": {
	id: "forward-reverse-kl.mdx";
  slug: "forward-reverse-kl";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"gan-pytorch.mdx": {
	id: "gan-pytorch.mdx";
  slug: "gan-pytorch";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"gan-tensorflow.mdx": {
	id: "gan-tensorflow.mdx";
  slug: "gan-tensorflow";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"gaussian-anomaly-detection.mdx": {
	id: "gaussian-anomaly-detection.mdx";
  slug: "gaussian-anomaly-detection";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"gibbs-sampling.mdx": {
	id: "gibbs-sampling.mdx";
  slug: "gibbs-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"gleam-use.mdx": {
	id: "gleam-use.mdx";
  slug: "gleam-use";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"hessian-curvatures.mdx": {
	id: "hessian-curvatures.mdx";
  slug: "hessian-curvatures";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"hessian-invariance.mdx": {
	id: "hessian-invariance.mdx";
  slug: "hessian-invariance";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"infogan.mdx": {
	id: "infogan.mdx";
  slug: "infogan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"jekyll-fb-share.mdx": {
	id: "jekyll-fb-share.mdx";
  slug: "jekyll-fb-share";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"kl-mle.mdx": {
	id: "kl-mle.mdx";
  slug: "kl-mle";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"laplace.mdx": {
	id: "laplace.mdx";
  slug: "laplace";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"lda-gibbs.mdx": {
	id: "lda-gibbs.mdx";
  slug: "lda-gibbs";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"least-squares-gan.mdx": {
	id: "least-squares-gan.mdx";
  slug: "least-squares-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"levelset-method.mdx": {
	id: "levelset-method.mdx";
  slug: "levelset-method";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"levelset-segmentation.mdx": {
	id: "levelset-segmentation.mdx";
  slug: "levelset-segmentation";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"lstm-backprop.mdx": {
	id: "lstm-backprop.mdx";
  slug: "lstm-backprop";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"manifold-gaussians.mdx": {
	id: "manifold-gaussians.mdx";
  slug: "manifold-gaussians";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"mayer-vietoris-sphere.mdx": {
	id: "mayer-vietoris-sphere.mdx";
  slug: "mayer-vietoris-sphere";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"metropolis-hastings.mdx": {
	id: "metropolis-hastings.mdx";
  slug: "metropolis-hastings";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"minkowski-dirichlet.mdx": {
	id: "minkowski-dirichlet.mdx";
  slug: "minkowski-dirichlet";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"mle-vs-map.mdx": {
	id: "mle-vs-map.mdx";
  slug: "mle-vs-map";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"natural-gradient.mdx": {
	id: "natural-gradient.mdx";
  slug: "natural-gradient";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"nn-optimization.mdx": {
	id: "nn-optimization.mdx";
  slug: "nn-optimization";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"nn-sgd.mdx": {
	id: "nn-sgd.mdx";
  slug: "nn-sgd";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"optimization-riemannian-manifolds.mdx": {
	id: "optimization-riemannian-manifolds.mdx";
  slug: "optimization-riemannian-manifolds";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"parallel-monte-carlo.mdx": {
	id: "parallel-monte-carlo.mdx";
  slug: "parallel-monte-carlo";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"plotting.mdx": {
	id: "plotting.mdx";
  slug: "plotting";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"rejection-sampling.mdx": {
	id: "rejection-sampling.mdx";
  slug: "rejection-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"residual-net.mdx": {
	id: "residual-net.mdx";
  slug: "residual-net";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"scrapy-long-running.mdx": {
	id: "scrapy-long-running.mdx";
  slug: "scrapy-long-running";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"slice-sampling.mdx": {
	id: "slice-sampling.mdx";
  slug: "slice-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"theano-pde.mdx": {
	id: "theano-pde.mdx";
  slug: "theano-pde";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"twitter-auth-flask.mdx": {
	id: "twitter-auth-flask.mdx";
  slug: "twitter-auth-flask";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"vae-pytorch.mdx": {
	id: "vae-pytorch.mdx";
  slug: "vae-pytorch";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"variational-autoencoder.mdx": {
	id: "variational-autoencoder.mdx";
  slug: "variational-autoencoder";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"volume-form.mdx": {
	id: "volume-form.mdx";
  slug: "volume-form";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"wagtail-dev-env.mdx": {
	id: "wagtail-dev-env.mdx";
  slug: "wagtail-dev-env";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"wasserstein-gan.mdx": {
	id: "wasserstein-gan.mdx";
  slug: "wasserstein-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"writing-advice.mdx": {
	id: "writing-advice.mdx";
  slug: "writing-advice";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
