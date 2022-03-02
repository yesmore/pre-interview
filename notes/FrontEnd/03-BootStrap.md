# Bootsrap

## CSS

### 容器

- 流体容器

	- width：100%
	- container-fluid

- 固定容器

	- container
	- 阈值

		- min-width
		- 阈值min-width：   xs、 768(sm)、992(md)、1200(lg)
width ：                 auto                 750             970             1170

- 栅格系统

	- row

		- col-lg-10

	- 默认将栅格分成12列
	- 阈值

		- lg(大屏pc)、md(中屏pc)、sm(平板)、xs(移动手机)

	- 槽宽

		- @grid-gutter-width

	- 源码分析

		- 流体容器&固定容器

			- margin-right：auto
			- margin-left：auto
			- padding-left：15px
			- padding-right：15px

		- 固定容器特定样式

			- 顺序不可变
			- @media  （min-width：@screen-sm-min）{
         width：@container-sm；
}
			- @media  （min-width：@screen-md-min）{
         width：@container-md；
}
			- @media  （min-width：@screen-lg-min）{
         width：@container-lg；
}

		- 行

			- .make-row(@gutter: @grid-gutter-width) {
     margin-left:   ceil ((@gutter  /  2));
     margin-right:  floor((@gutter  /  2));
     & : extend(.clearfix  all);
}

		- 列

			- 子主题 1

