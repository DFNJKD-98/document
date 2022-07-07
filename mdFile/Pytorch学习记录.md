---
title: Pytorch学习记录
---

<h1 align="center" id="index">Pytorch学习记录</h1>

## torch.unsqueeze

> 这个函数主要是对数据维度进行扩充，给指定位置加上维数为一的维度

## torch.squeeze

> 这个函数主要对数据的维度进行压缩，去掉维数为1的的维度

## torch.max

> output = torch.max(input, dim)

- `input`是softmax函数输出的一个`tensor`
- `dim`是max函数索引的维度`0/1`，`0`是每列的最大值，`1`是每行的最大值
- 函数会返回两个`tensor`，第一个`tensor`是每行的最大值；第二个`tensor`是每行最大值的索引。

## torch.gather

> 从原tensor中获取指定dim和指定index的数据

## tensor.data

> 返回和 `x` 具有相同数据 的`tensor`（和x共享同一块数据）, 但不会加入到`x`的计算历史里，且`requires_grad = False`，这样有些时候是不安全的,，因为 `x.data` 不能被 `autograd` 追踪求微分

## tensor.detach

> 返回和 `x` 具有相同数据 的`tensor`（和x共享同一块数据）, 但不会加入到`x`的计算历史里，且`requires_grad = False`。但能在进行反向传播的时候，通过 `inplace operation` 操作报告给 `autograd` 

## tensor.cuda

> CPU tensor 转为 GPU tensor

## tensor.cpu

> GPU tensor 转为 CPU tensor

## tensor.view

> `.view()`方法只能改变连续的(contiguous)张量，否则需要先调用`.contiguous()`方法；
>
> `.reshape()`方法不受此限制；
>
> `.view()`方法返回的张量与原张量共享基础数据(存储器，注意不是共享内存地址)
>
> `.reshape()`方法返回的可能是原张量的copy，也可能不是
>
> 如果对 tensor调用过 `transpose`, `permute`等操作的话会使该 tensor 在内存中变得不再连续。使用`tensor.is_contiguous()`查看tensor是否连续