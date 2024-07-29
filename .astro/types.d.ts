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
"2015-06-21-wagtail-dev-env.md": {
	id: "2015-06-21-wagtail-dev-env.md";
  slug: "2015-06-21-wagtail-dev-env";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2015-06-22-developing-wagtail.md": {
	id: "2015-06-22-developing-wagtail.md";
  slug: "2015-06-22-developing-wagtail";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2015-06-23-deploying-wagtail.md": {
	id: "2015-06-23-deploying-wagtail.md";
  slug: "2015-06-23-deploying-wagtail";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2015-08-29-twitter-auth-flask.md": {
	id: "2015-08-29-twitter-auth-flask.md";
  slug: "2015-08-29-twitter-auth-flask";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2015-10-09-gibbs-sampling.md": {
	id: "2015-10-09-gibbs-sampling.md";
  slug: "2015-10-09-gibbs-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2015-10-17-metropolis-hastings.md": {
	id: "2015-10-17-metropolis-hastings.md";
  slug: "2015-10-17-metropolis-hastings";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2015-10-21-rejection-sampling.md": {
	id: "2015-10-21-rejection-sampling.md";
  slug: "2015-10-21-rejection-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2015-10-24-slice-sampling.md": {
	id: "2015-10-24-slice-sampling.md";
  slug: "2015-10-24-slice-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-01-16-gaussian-anomaly-detection.md": {
	id: "2016-01-16-gaussian-anomaly-detection.md";
  slug: "2016-01-16-gaussian-anomaly-detection";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-06-10-scrapy-long-running.md": {
	id: "2016-06-10-scrapy-long-running.md";
  slug: "2016-06-10-scrapy-long-running";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-06-13-parallel-monte-carlo.md": {
	id: "2016-06-13-parallel-monte-carlo.md";
  slug: "2016-06-13-parallel-monte-carlo";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-06-21-nn-sgd.md": {
	id: "2016-06-21-nn-sgd.md";
  slug: "2016-06-21-nn-sgd";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-06-22-nn-optimization.md": {
	id: "2016-06-22-nn-optimization.md";
  slug: "2016-06-22-nn-optimization";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-06-25-dropout.md": {
	id: "2016-06-25-dropout.md";
  slug: "2016-06-25-dropout";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-07-04-batchnorm.md": {
	id: "2016-07-04-batchnorm.md";
  slug: "2016-07-04-batchnorm";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-07-16-convnet-conv-layer.md": {
	id: "2016-07-16-convnet-conv-layer.md";
  slug: "2016-07-16-convnet-conv-layer";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-07-18-convnet-maxpool-layer.md": {
	id: "2016-07-18-convnet-maxpool-layer.md";
  slug: "2016-07-18-convnet-maxpool-layer";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-08-12-lstm-backprop.md": {
	id: "2016-08-12-lstm-backprop.md";
  slug: "2016-08-12-lstm-backprop";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-08-15-jekyll-fb-share.md": {
	id: "2016-08-15-jekyll-fb-share.md";
  slug: "2016-08-15-jekyll-fb-share";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-09-17-gan-tensorflow.md": {
	id: "2016-09-17-gan-tensorflow.md";
  slug: "2016-09-17-gan-tensorflow";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-10-13-residual-net.md": {
	id: "2016-10-13-residual-net.md";
  slug: "2016-10-13-residual-net";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-11-05-levelset-method.md": {
	id: "2016-11-05-levelset-method.md";
  slug: "2016-11-05-levelset-method";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-11-20-levelset-segmentation.md": {
	id: "2016-11-20-levelset-segmentation.md";
  slug: "2016-11-20-levelset-segmentation";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-12-03-autoencoders.md": {
	id: "2016-12-03-autoencoders.md";
  slug: "2016-12-03-autoencoders";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-12-05-contractive-autoencoder.md": {
	id: "2016-12-05-contractive-autoencoder.md";
  slug: "2016-12-05-contractive-autoencoder";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-12-10-variational-autoencoder.md": {
	id: "2016-12-10-variational-autoencoder.md";
  slug: "2016-12-10-variational-autoencoder";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-12-17-conditional-vae.md": {
	id: "2016-12-17-conditional-vae.md";
  slug: "2016-12-17-conditional-vae";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-12-21-forward-reverse-kl.md": {
	id: "2016-12-21-forward-reverse-kl.md";
  slug: "2016-12-21-forward-reverse-kl";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2016-12-24-conditional-gan-tensorflow.md": {
	id: "2016-12-24-conditional-gan-tensorflow.md";
  slug: "2016-12-24-conditional-gan-tensorflow";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-01-01-mle-vs-map.md": {
	id: "2017-01-01-mle-vs-map.md";
  slug: "2017-01-01-mle-vs-map";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-01-05-bayesian-regression.md": {
	id: "2017-01-05-bayesian-regression.md";
  slug: "2017-01-05-bayesian-regression";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-01-08-theano-pde.md": {
	id: "2017-01-08-theano-pde.md";
  slug: "2017-01-08-theano-pde";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-01-20-gan-pytorch.md": {
	id: "2017-01-20-gan-pytorch.md";
  slug: "2017-01-20-gan-pytorch";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-01-24-vae-pytorch.md": {
	id: "2017-01-24-vae-pytorch.md";
  slug: "2017-01-24-vae-pytorch";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-01-26-kl-mle.md": {
	id: "2017-01-26-kl-mle.md";
  slug: "2017-01-26-kl-mle";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-01-29-infogan.md": {
	id: "2017-01-29-infogan.md";
  slug: "2017-01-29-infogan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-02-04-wasserstein-gan.md": {
	id: "2017-02-04-wasserstein-gan.md";
  slug: "2017-02-04-wasserstein-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-02-18-coupled_gan.md": {
	id: "2017-02-18-coupled_gan.md";
  slug: "2017-02-18-coupled_gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-03-02-least-squares-gan.md": {
	id: "2017-03-02-least-squares-gan.md";
  slug: "2017-03-02-least-squares-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-03-07-boundary-seeking-gan.md": {
	id: "2017-03-07-boundary-seeking-gan.md";
  slug: "2017-03-07-boundary-seeking-gan";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-09-07-lda-gibbs.md": {
	id: "2017-09-07-lda-gibbs.md";
  slug: "2017-09-07-lda-gibbs";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2017-12-23-annealed-importance-sampling.md": {
	id: "2017-12-23-annealed-importance-sampling.md";
  slug: "2017-12-23-annealed-importance-sampling";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2018-03-09-fisher-information.md": {
	id: "2018-03-09-fisher-information.md";
  slug: "2018-03-09-fisher-information";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2018-03-14-natural-gradient.md": {
	id: "2018-03-14-natural-gradient.md";
  slug: "2018-03-14-natural-gradient";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2018-07-18-brouwers-fixed-point.md": {
	id: "2018-07-18-brouwers-fixed-point.md";
  slug: "2018-07-18-brouwers-fixed-point";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2018-07-23-mayer-vietoris-sphere.md": {
	id: "2018-07-23-mayer-vietoris-sphere.md";
  slug: "2018-07-23-mayer-vietoris-sphere";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2018-07-24-minkowski-dirichlet.md": {
	id: "2018-07-24-minkowski-dirichlet.md";
  slug: "2018-07-24-minkowski-dirichlet";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2019-02-17-riemannian-geometry.md": {
	id: "2019-02-17-riemannian-geometry.md";
  slug: "2019-02-17-riemannian-geometry";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2019-04-09-optimization-riemannian-manifolds.md": {
	id: "2019-04-09-optimization-riemannian-manifolds.md";
  slug: "2019-04-09-optimization-riemannian-manifolds";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2020-11-02-hessian-curvatures.md": {
	id: "2020-11-02-hessian-curvatures.md";
  slug: "2020-11-02-hessian-curvatures";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2021-06-21-manifold-gaussians.md": {
	id: "2021-06-21-manifold-gaussians.md";
  slug: "2021-06-21-manifold-gaussians";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2021-07-20-chentsov-theorem.md": {
	id: "2021-07-20-chentsov-theorem.md";
  slug: "2021-07-20-chentsov-theorem";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2021-10-27-laplace.md": {
	id: "2021-10-27-laplace.md";
  slug: "2021-10-27-laplace";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2022-05-01-plotting.md": {
	id: "2022-05-01-plotting.md";
  slug: "2022-05-01-plotting";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2022-06-25-conv-probit.md": {
	id: "2022-06-25-conv-probit.md";
  slug: "2022-06-25-conv-probit";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2023-02-09-hessian-invariance.md": {
	id: "2023-02-09-hessian-invariance.md";
  slug: "2023-02-09-hessian-invariance";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"2023-12-13-volume-form.md": {
	id: "2023-12-13-volume-form.md";
  slug: "2023-12-13-volume-form";
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
