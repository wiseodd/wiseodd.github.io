
The idea of Contractive Autoencoder is to make the learned representation as robust as possible. It achieves that by using different penalty term imposed to the representation. Hence, the loss function is as follows:

$$ L = \lVert X - \hat{X} \rVert_2^2  + \lambda \lVert J_h(X) \rVert_2^2 $$

in which

$$ \lVert J_h(X) \rVert_2^2 = \sum_{ij} \left( \frac{\partial h_j(X)}{\partial X_i} \right)^2 $$

that is, the penalty term is the euclidean norm of the jacobian of the learned representation.

In the loss above, clearly it's the calculation of the jacobian that's a little bit complicated. Calculating a jacobian of the hidden layer with respect to input is similar to gradient calculation. Recall than jacobian is the generalization of gradient, i.e. when a function is a vector valued function, the partial derivative is a matrix called jacobian.

Let's calculate the jacobian of the hidden layer of our autoencoder then. Let's say:

$$ h_j(X_i) = \phi(W_{ij}X_i) $$

where \\( \phi \\) is sigmoid nonlinearity. Then using chain rule:

$$ \begin{align}

\frac{\partial h_j(X_i)}{\partial X_i} &= \frac{\partial \phi(W_{ij}X_i)}{\partial X_i} \\[10pt]
                                 &= \frac{\partial \phi(W_{ij}X_i)}{\partial W_{ij}X_i} \frac{\partial W_{ij}X_i}{\partial X_i} \\[10pt]
                                 &= [\phi(W_{ij}X_i)(1 - \phi(W_{ij}X_i))] \, W_{ij} \\[10pt]
                                 &= [h_j(X_i)(1 - h_j(X_i))] \, W_{ij}

\end{align} $$

Or in vector form:

$$ \begin{align}

\frac{\partial h_j(X)}{\partial X} &= [\phi(W_iX)(1 - \phi(W_iX))] \, W_j \\[10pt]
                                   &= [\phi(W_jX)(1 - \phi(W_jX))] \, W_j

\end{align} $$

It looks familiar, doesn't it? Because it's exactly how we calculate gradient. The difference is however, that we treat \\( h(X) \\) as a vector valued function. That is, we treat \\( h_{i}(X) \\) each as a separate output. Intuitively, let's say for example we have 64 hidden units, then we treat each hidden unit as a separate output, and so we will have a gradient vector for each hidden unit. Hence, when we get the derivative of that hidden layer, what we get instead is a jacobian matrix. And as we now know how to calculate the jacobian, we can calculate the penalty term in our loss.

Translated to code:

``` python
inputs = Input(shape=(N,))
encoded = Dense(N_hidden, activation='sigmoid', name='encoded')(inputs)
outputs = Dense(N, activation='linear')(encoded)

model = Model(input=inputs, output=outputs)

def contractive_loss(y_pred, y_true):
    mse = K.mean(K.square(y_true - y_pred), axis=1)

    W = K.variable(value=model.get_layer('encoded').get_weights()[0])  # N x N_hidden
    W = K.transpose(W)  # N_hidden x N
    h = model.get_layer('encoded').output
    dh = h * (1 - h)  # N_batch x N_hidden

    # N_batch x N_hidden * N_hidden x 1 = N_batch x 1
    contractive = lam * K.sum(dh**2 * K.sum(W**2, axis=1), axis=1)

    return mse + contractive

model.compile(optimizer='adam', loss=contractive_loss)
model.fit(X, X, batch_size=N_batch, nb_epoch=5)
```