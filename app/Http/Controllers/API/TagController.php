<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTagRequest;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreTagRequest $request)
    {
        $data = $request->safe()->only(['project_id','title','description']);

        $tag = Tag::create($data);

        if(!$tag){
            $res = [
                'success' => false,
                'message'=>'Tag could not be created.'
            ];

            $status = 500;
        }
        else{
            $res = [
                'success' => true,
                'tag'=>$tag
            ];
            $status = 201;
        }

        return response()->json($res, $status);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $tag= Tag::findOrFail($id);

            if($tag->delete()) {
                return response()->json(['success' => true, 'message' => 'Tag deleted.'], 200);
            }
            else {
                return response()->json(['success'=>false,'message' => 'Tag could not be deleted. Cause unknown.'], 500);
            }
        }
        catch(\Exception $e){
            return response()->json(['success'=>false,'message' => 'Tag could not be found.'], 404);
        }

    }
}
