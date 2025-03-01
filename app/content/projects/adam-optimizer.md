---
title: "Motivating Adam Optimizer"
date: "2024-09-16"
description: "Exploring how the Adam optimizer improves upon standard gradient descent"
---

# Motivating Adam Optimizer

Our first type of optimization, the standard one size fits all solution would be to subtract the gradient from the weights multiplied by some learning rate constant throughout training. This changes the weights all the same amount relative to their gradients. One obvious downside of this approach, is it does not have any memory of prior gradient descent values prior, so in effect, this can make the descent path more sparse. Basically the noise in the movement would be larger because we are not identifying prior redundant paths based on a moving average, so if we are jostling from high negative to high positive gradients and going across the whole error surface for every iteration, we wouldn't be able to use this information in standard gradient descent with a constant learning rate.

Another thing which is bad about a constant learning rate, is that during initial training, there are large gradients, and it would be helpful and more computationally efficient to exponentially descrease the learning rate as the training goes on since this could help us reduce the required number of iterations.

## Stochastic Gradient Descent

W\_{t+1}=W_t-eta\*\nabla{partial L}{partial W_t}

This is the basic gradient descent formula. The next set of weights is equal to what they were prior, minus the gradients times the learning rate.

## Stochastic Gradient Descent with Momentum

Now, we can create memory of past gradient descent gradients in order to smooth our descent through the error surface. We can do this with something called momentum.
