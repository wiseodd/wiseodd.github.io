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
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

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
		"post": {
"annealed-importance-sampling.md": {
	id: "annealed-importance-sampling.md";
  slug: "annealed-importance-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"autoencoders.md": {
	id: "autoencoders.md";
  slug: "autoencoders";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"batchnorm.md": {
	id: "batchnorm.md";
  slug: "batchnorm";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"bayesian-regression.md": {
	id: "bayesian-regression.md";
  slug: "bayesian-regression";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"boundary-seeking-gan.md": {
	id: "boundary-seeking-gan.md";
  slug: "boundary-seeking-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"brouwers-fixed-point.md": {
	id: "brouwers-fixed-point.md";
  slug: "brouwers-fixed-point";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"chentsov-theorem.md": {
	id: "chentsov-theorem.md";
  slug: "chentsov-theorem";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"conditional-gan-tensorflow.md": {
	id: "conditional-gan-tensorflow.md";
  slug: "conditional-gan-tensorflow";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"conditional-vae.md": {
	id: "conditional-vae.md";
  slug: "conditional-vae";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"contractive-autoencoder.md": {
	id: "contractive-autoencoder.md";
  slug: "contractive-autoencoder";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"conv-probit.mdx": {
	id: "conv-probit.mdx";
  slug: "conv-probit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"convnet-conv-layer.md": {
	id: "convnet-conv-layer.md";
  slug: "convnet-conv-layer";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"convnet-maxpool-layer.md": {
	id: "convnet-maxpool-layer.md";
  slug: "convnet-maxpool-layer";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"coupled_gan.md": {
	id: "coupled_gan.md";
  slug: "coupled_gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"deploying-wagtail.md": {
	id: "deploying-wagtail.md";
  slug: "deploying-wagtail";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"developing-wagtail.md": {
	id: "developing-wagtail.md";
  slug: "developing-wagtail";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"dropout.md": {
	id: "dropout.md";
  slug: "dropout";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"fisher-information.md": {
	id: "fisher-information.md";
  slug: "fisher-information";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"forward-reverse-kl.md": {
	id: "forward-reverse-kl.md";
  slug: "forward-reverse-kl";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"gan-pytorch.md": {
	id: "gan-pytorch.md";
  slug: "gan-pytorch";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"gan-tensorflow.md": {
	id: "gan-tensorflow.md";
  slug: "gan-tensorflow";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"gaussian-anomaly-detection.md": {
	id: "gaussian-anomaly-detection.md";
  slug: "gaussian-anomaly-detection";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"gibbs-sampling.md": {
	id: "gibbs-sampling.md";
  slug: "gibbs-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"hessian-curvatures.md": {
	id: "hessian-curvatures.md";
  slug: "hessian-curvatures";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"hessian-invariance.mdx": {
	id: "hessian-invariance.mdx";
  slug: "hessian-invariance";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"infogan.md": {
	id: "infogan.md";
  slug: "infogan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"jekyll-fb-share.md": {
	id: "jekyll-fb-share.md";
  slug: "jekyll-fb-share";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"kl-mle.md": {
	id: "kl-mle.md";
  slug: "kl-mle";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"laplace.mdx": {
	id: "laplace.mdx";
  slug: "laplace";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"lda-gibbs.md": {
	id: "lda-gibbs.md";
  slug: "lda-gibbs";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"least-squares-gan.md": {
	id: "least-squares-gan.md";
  slug: "least-squares-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"levelset-method.md": {
	id: "levelset-method.md";
  slug: "levelset-method";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"levelset-segmentation.md": {
	id: "levelset-segmentation.md";
  slug: "levelset-segmentation";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"lstm-backprop.md": {
	id: "lstm-backprop.md";
  slug: "lstm-backprop";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"manifold-gaussians.md": {
	id: "manifold-gaussians.md";
  slug: "manifold-gaussians";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"mayer-vietoris-sphere.md": {
	id: "mayer-vietoris-sphere.md";
  slug: "mayer-vietoris-sphere";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"metropolis-hastings.md": {
	id: "metropolis-hastings.md";
  slug: "metropolis-hastings";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"minkowski-dirichlet.md": {
	id: "minkowski-dirichlet.md";
  slug: "minkowski-dirichlet";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"mle-vs-map.md": {
	id: "mle-vs-map.md";
  slug: "mle-vs-map";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"natural-gradient.md": {
	id: "natural-gradient.md";
  slug: "natural-gradient";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"nn-optimization.md": {
	id: "nn-optimization.md";
  slug: "nn-optimization";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"nn-sgd.md": {
	id: "nn-sgd.md";
  slug: "nn-sgd";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"optimization-riemannian-manifolds.md": {
	id: "optimization-riemannian-manifolds.md";
  slug: "optimization-riemannian-manifolds";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"parallel-monte-carlo.md": {
	id: "parallel-monte-carlo.md";
  slug: "parallel-monte-carlo";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"plotting.mdx": {
	id: "plotting.mdx";
  slug: "plotting";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"rejection-sampling.md": {
	id: "rejection-sampling.md";
  slug: "rejection-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"residual-net.md": {
	id: "residual-net.md";
  slug: "residual-net";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"riemannian-geometry.md": {
	id: "riemannian-geometry.md";
  slug: "riemannian-geometry";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"scrapy-long-running.md": {
	id: "scrapy-long-running.md";
  slug: "scrapy-long-running";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"slice-sampling.md": {
	id: "slice-sampling.md";
  slug: "slice-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"theano-pde.md": {
	id: "theano-pde.md";
  slug: "theano-pde";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"twitter-auth-flask.md": {
	id: "twitter-auth-flask.md";
  slug: "twitter-auth-flask";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"vae-pytorch.md": {
	id: "vae-pytorch.md";
  slug: "vae-pytorch";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"variational-autoencoder.md": {
	id: "variational-autoencoder.md";
  slug: "variational-autoencoder";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"volume-form.mdx": {
	id: "volume-form.mdx";
  slug: "volume-form";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"wagtail-dev-env.md": {
	id: "wagtail-dev-env.md";
  slug: "wagtail-dev-env";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"wasserstein-gan.md": {
	id: "wasserstein-gan.md";
  slug: "wasserstein-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
