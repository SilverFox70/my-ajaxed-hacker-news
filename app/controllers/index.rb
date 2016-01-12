get '/' do
  redirect '/posts'
end

get '/posts' do
  @posts = Post.all
  erb :index
end

get '/posts/:id/vote' do
  post = Post.find(params[:id])
  post.votes.create(value: 1)
  if request.xhr?
    {points: post.points, post_number: params[:id]}.to_json
  else
    redirect '/posts'
  end
end

delete '/posts/:id' do
  post = Post.find(params[:id])
  post.destroy
  if request.xhr?
    {post_number: params[:id]}.to_json
  else
    redirect '/posts'
  end
end

post '/posts' do
  @new_post = Post.create( title: params[:title],
               username: Faker::Internet.user_name,
               comment_count: rand(1000) )
  erb :_article, layout: false
end

get '/post/:id' do
  @post = Post.find(params[:id])
  erb :post
end
